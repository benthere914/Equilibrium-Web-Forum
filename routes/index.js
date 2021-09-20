var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler, handleValidationErrors, bcrypt, check } = require('../utils');
const db = require('../db/models');
const { User } = db;

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
      .withMessage('Please provide a value for Username'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Password'),
  ];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

router.get('/sign-up', function(req, res, next) {
    res.render('index', { title: 'a/A Express Skeleton Home' });
  });

router.get('/log-in', function(req, res, next) {
    res.render('index', { title: 'a/A Express Skeleton Home' });
  });

router.post('/sign-up',
    // csrfProtection,
    userValidators,
    handleValidationErrors,
    asyncHandler(async (req, res, next) => {
        let {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser = await User.create({username, hashedPassword})
        res.send({'message': 'check postbird'})

  }));

router.post('/log-in', function(req, res, next) {
    ;
});

module.exports = router;
