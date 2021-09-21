
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
const db = require("../db/models");
const { Post, User, Topic, Comment } = db;

router.get(
	/\/\d+/,
	asyncHandler(async (req, res) => {
		const postId = req.url.slice(1);
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
		res.render("post", { post, author: post.User, comments });
		console.log(post);
	})
);


module.exports = router;
