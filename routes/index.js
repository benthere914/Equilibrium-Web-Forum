const express = require('express');
const router = express.Router();
const {
	csrfProtection,
	asyncHandler,
	handleValidationErrors,
	bcrypt,
	check,
} = require('../utils');
const db = require('../db/models');
const { User, Post, Topic } = db;
const { loginUser, logoutUser, restoreUser, requireAuth } = require('../auth');
const { validationResult } = require('express-validator');
router.use(express.json());
const userValidators = [
	check('username')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a value for UserName')
		.isLength({ max: 255 })
		.withMessage('UserName must not be more than 255 characters long')
		.custom((value) => {
			return db.User.findOne({ where: { username: value } }).then((user) => {
				if (user) {
					return Promise.reject(
						'The provided UserName is already in use by another account'
					);
				}
			});
		}),
	check('password')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a value for Password')
		.isLength({ max: 50 })
		.withMessage('Password must not be more than 50 characters long')
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
		.withMessage(
			'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
		),
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
		}),
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
router.get(
	'/',
	csrfProtection,
	restoreUser,
	asyncHandler(async (req, res, next) => {
		let topics = await db.Topic.findAll();
		topics = topics.map((e) => {
			e = e.dataValues;
			return { name: e.name, id: e.id };
		});

		let posts = await db.Post.findAll({
			include: [User, Topic],
			order: [['createdAt', 'DESC']],
			limit: 30,
		});
		posts = posts.map((e) => {
			e = e.dataValues;
			e.content = e.content.slice(0, 100);
			if (e.title.length > 50) {
				while (e.title.length > 50) {
					e.title = e.title.split(' ');
					e.title = e.title.slice(0, e.title.length - 1);
					e.title = e.title.join(' ');
				}

				e.title += '...';
			}
			let userId;
			if (req.session.auth) {
				if (req.session.auth.userId) {
					e.matches = e.User.id === req.session.auth.userId;
				}
			}
			return e;
		});
		let userId;
		if (req.session.auth) {
			userId = req.session.auth.userId;
		} else {
			userId = NaN;
		}
		res.render('index', {
			loggedIn: res.locals.authenticated,
			topics,
			posts,
			csrfToken: req.csrfToken(),
			userId,
		});
	})
);

router.post(
	'/sign-up',
	csrfProtection,
	userValidators,
	asyncHandler(async (req, res) => {
		let { username, password } = req.body;
		let error = [];
		const validatorErrors = validationResult(req);
		if (validatorErrors.isEmpty()) {
			const hashedPassword = await bcrypt.hash(password, 10);
			let user = await User.create({ username, hashedPassword });
			loginUser(req, res, user);
			res.json({ message: 'success' });
		} else {
			error = validatorErrors.array().map((e) => e.msg);
			res.json({ error });
		}
	})
);

router.post(
	'/log-in',
	loginValidators,
	csrfProtection,
	asyncHandler(async (req, res, next) => {
		const { username, password } = req.body;
		let error = [];
		const validatorErrors = validationResult(req);
		if (validatorErrors.isEmpty()) {
			const user = await User.findOne({ where: { username } });
			let passwordMatches;
			if (user) {
				passwordMatches = await bcrypt.compare(
					password,
					user.hashedPassword.toString()
				);
			}
			if (passwordMatches) {
				loginUser(req, res, user);
				return res.json({ message: 'success' });
			}
			error.push('Incorrect login credentials');
			res.json({ error });
		} else {
			error = validatorErrors.array().map((e) => e.msg);
			res.json({ error });
		}
	})
);

router.post(
	'/log-in-demo',
	asyncHandler(async (req, res) => {
		const user = await User.findOne({ where: { username: 'John Doe' } });
		loginUser(req, res, user);
		return req.session.save(() => {
			res.redirect('back');
		});
	})
);

router.post('/log-out', (req, res, next) => {
	logoutUser(req, res);
	return req.session.save(() => {
		res.redirect('/');
	});
});

router.get(
	'/my-account',
	csrfProtection,
	restoreUser,
	asyncHandler(async (req, res, next) => {
		let userId;
		if (req.session.auth) {
			userId = req.session.auth.userId;
		}
        if (userId){
		    let user = await User.findByPk(userId);
		    user = user.dataValues;
		    res.render('my-account', {
                userId,
			    user,
			    loggedIn: res.locals.authenticated,
			    csrfToken: req.csrfToken(),
			    bioLength: user.biography.length,
		    });
        }
        return next();
	})
);

router.get('/404', restoreUser, (req, res) => {
	res.render('404Error', {loggedIn: res.locals.authenticated});
});
module.exports = { router };
