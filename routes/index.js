var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler, handleValidationErrors, bcrypt, check } = require('../utils');
const db = require('../db/models');
const { User } = db;
const { loginUser,logoutUser,restoreUser,requireAuth } = require('../auth');
const { render } = require('../app');
const { validationResult } = require('express-validator');

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
router.get('/', restoreUser, asyncHandler(async function(req, res, next) {
    const topics = await db.Topic.findAll();
    const posts = [];
    console.log(res.locals);
  res.render('index', {loggedIn: res.locals.authenticated, topics, posts});
}));

router.get('/sign-up', function(req, res, next) {
    res.render('index', { title: 'a/A Express Skeleton Home' });
  });


router.get('/log-in', csrfProtection, function(req, res, next) {
    res.render('log-in', { title: 'log-in',  csrfToken: req.csrfToken()});
  });

router.post('/sign-up',
    // csrfProtection,
    userValidators,
    handleValidationErrors,
    asyncHandler(async (req, res, next) => {
        let {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await User.create({username, hashedPassword});
        console.log(req.session);
        loginUser(req, res, user);
        res.redirect('/');

  }));


router.post('/log-in', loginValidators, csrfProtection, asyncHandler( async (req, res, next) => {

    const {username, password} = req.body;
    let error = [];
    const validatorErrors = validationResult(req);
    console.log(validatorErrors)
    if (validatorErrors.isEmpty()){
        console.log(123)
        const user = await User.findOne({where: {username}})
        const passwordMatches = await bcrypt.compare(password, user.hashedPassword.toString());
        if (passwordMatches) {loginUser(req, res, user); return res.redirect('/')}
        error.push('Incorrect login credentials')
    }
    else {
        error = validatorErrors.array().map(e => e.msg)
    }

    res.render('log-in', {csrfToken: req.csrfToken(), username, error})
    // res.redirect('/')
    res.send('abc')
}));


router.post('/log-out', asyncHandler(async (req, res, next) => {
    logoutUser(req, res);
    res.redirect('/');
}))

module.exports = router;
