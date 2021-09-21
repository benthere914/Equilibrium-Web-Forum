var express = require("express");
var router = express.Router();
const {
	asyncHandler,
	handleValidationErrors,
	check,
	validationResult,
	bcrypt,
	csrfProtection,
} = require("../utils");
const { restoreUser } = require("../auth");
const db = require("../db/models");
const { Post, User, Topic, Comment } = db;

router.get(
	"/:id(\\d+)",
	restoreUser,
	asyncHandler(async (req, res) => {
		const postId = req.params.id;
		let post = await Post.findOne({
			where: { id: postId },
			include: [{ model: User }, { model: Topic }],
		});
		let comments = await Comment.findAll({
			where: { postId },
			include: { model: User },
		});
		comments = comments.map((e) => {
			let data = e.dataValues;
			console.log(data);
			data.User = data.User.dataValues;
			return data;
		});
		console.log(comments);
		post = post.dataValues;
		post.User = post.User.dataValues;
		post.Topic = post.Topic.dataValues;
		console.log(post);
		res.render("post", {
			post,
			author: post.User,
			comments,
			loggedIn: res.locals.authenticated,
            userId: req.session.auth.userId
		});
		console.log(post);
	})
);

router.get(
	"/create",
	csrfProtection,
	restoreUser,
	asyncHandler(async (req, res) => {
		if (res.locals.authenticated === true) {
			const userId = req.session.auth.userId;
			const user = await User.findByPk(userId);
			const topics = await Topic.findAll();
			console.log(topics);
			res.render("create-post", {
				user,
				topics,
				loggedIn: res.locals.authenticated,
				csrfToken: req.csrfToken(),
                userId: req.session.auth.userId
			});
		} else {
			res.redirect("/");
		}
	})
);

router.post(
	"/create",
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { userId, topicId, title, content, imgUrl} = req.body;
        if (imgUrl === "") {
            let post = await Post.create({
							userId,
							topicId,
							title,
							content,
						});
                        res.status(200).json({ post });
        } else {
			let post = await Post.create({ userId, topicId, title, content, imgUrl });
            res.status(200).json({ post });
        }

	}));


module.exports = router;
