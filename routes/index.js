const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler, handleValidationErrors, bcrypt, check } = require('../utils');
const db = require('../db/models');
const { User } = db;
const { loginUser,logoutUser,restoreUser,requireAuth } = require('../auth');
const { validationResult } = require('express-validator');
router.use(express.json());
const userValidators = [
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for UserName')
        .isLength({ max: 255 })
        .withMessage('UserName must not be more than 255 characters long')
        .custom((value) => {
        return db.User.findOne({ where: { username: value } })
            .then((user) => {
            if (user) {
                return Promise.reject('The provided UserName is already in use by another account');
            }
            });
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')
        .isLength({ max: 50 })
        .withMessage('Password must not be more than 50 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password')
        .isLength({ max: 50 })
        .withMessage('Confirm Password must not be more than 50 characters long')
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Confirm Password does not match Password');
        }
        return true;
        })
];
const loginValidators = [
    check('username')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Username')
      .custom((value) => {
        return db.User.findOne({ where: { username: value } })
            .then((user) => {
                if (!user) {
                    return Promise.reject('Incorrect login credentials');
                }
            })}),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Password')
  ];




/* GET home page. */
router.get('/', csrfProtection, restoreUser, asyncHandler(async function(req, res, next) {

    let topics = await db.Topic.findAll();
     topics = topics.map(e => {
         e = e.dataValues
         return {name: e.name, id: e.id}
     });

    let posts = await db.Post.findAll({include: User
    });
    posts = posts.map(e => {
        e = e.dataValues
        e.content = e.content.slice(0, 100, '...');
        let userId
        if (req.session.auth){
            if (req.session.auth.userId){
                e.matches = (e.User.id === req.session.auth.userId);
            }
        }
        console.log(e.matches)
        return e;
    })
    if (req.session.auth){userId = req.session.auth.userId}
    else {userId = NaN}
  res.render("index", {
		loggedIn: res.locals.authenticated,
		topics,
		posts,
		csrfToken: req.csrfToken(),
        userId
	});
}));

router.post('/sign-up',
    csrfProtection,
    userValidators,
    asyncHandler( async (req, res) => {
        let {username, password} = req.body;
        let error =[];
        const validatorErrors = validationResult(req);
        if (validatorErrors.isEmpty()) {
            const hashedPassword = await bcrypt.hash(password, 10);
            let user = await User.create({username, hashedPassword});
            loginUser(req, res, user);
            res.status(201);
            res.redirect("/");
        } else {
            error = validatorErrors.array().map((e) => e.msg);
            res.status(400).json({error});
        }
  }));


router.post('/log-in', loginValidators, csrfProtection, asyncHandler( async (req, res, next) => {
    const {username, password} = req.body;
    let error = [];
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()){
        const user = await User.findOne({where: {username}})
        const passwordMatches = await bcrypt.compare(password, user.hashedPassword.toString());
        if (passwordMatches) {
            loginUser(req, res, user);
            return res.redirect('/')
        }
        error.push('Incorrect login credentials')
        res.status(400).json({error});
    }
    else {
        error = validatorErrors.array().map(e => e.msg)
        res.status(400).json({ error });
    }
}));



router.post('/log-in-demo', asyncHandler(async (req, res) => {
    const user = await User.findOne();
    loginUser(req, res, user);
    return req.session.save(() => {res.redirect('/')})
}))

router.post('/log-out', (req, res, next) => {
    logoutUser(req, res);
    return req.session.save(() => {res.redirect('/')})
})

module.exports = router;
