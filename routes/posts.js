const express = require("express");
const router = express.Router();
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
const { Post, User, Topic, Comment, Vote } = db;

router.get(
	"/:id(\\d+)",
	restoreUser,
	asyncHandler(async (req, res) => {
		let userId;
		if (req.session.auth) {
			userId = req.session.auth.userId;
		} else {
			userId = NaN;
		}
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
			data.User = data.User.dataValues;
			return data;
		});
		const votes = await Vote.findAll({
			where: {
				postId: postId,
			},
		});
		let voteTotal;

		const votesArray = votes.map((vote) => vote.dataValues.voteCount);
		if (votesArray.length === 0) {
			voteTotal = 0;
		} else {
			voteTotal = votesArray.reduce((acc, cVal) => {
				return acc + cVal;
			});
		}

		post = post.dataValues;
		post.User = post.User.dataValues;
		post.Topic = post.Topic.dataValues;

		res.render("post", {
			post,
			postId,
			author: post.User,
			comments,
			loggedIn: res.locals.authenticated,
			userId,
			voteTotal,
		});
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
				userId: req.session.auth.userId,
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
		const { userId, topicId, title, content, imgUrl } = req.body;
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
	})
);

router.post(
	"/:id/votes",
	asyncHandler(async (req, res) => {
		const postId = req.params.id;
		const { userId, vote } = req.body;

		const userVote = await Vote.findOne({
			where: {
				postId: postId,
				userId: userId
			}
		});
		if (!userVote) {
			console.log("here");
			const sendVote = await Vote.create({
				userId,
				postId,
				voteCount: vote
			});

		} else if (userVote.dataValues.voteCount !== vote) {
			await userVote.update({
				voteCount: vote,
			});
		} else if (userVote.dataValues.voteCount === vote){
			await userVote.update({
				voteCount: 0,
			});
		}
		const currentPostVoteCount = await Vote.findAll({
			where: {
				postId: postId
			}
		});
		let voteTotal;
		const votesArray = currentPostVoteCount.map(
			(vote) => vote.dataValues.voteCount
		);
		if (votesArray.length === 0) {
			voteTotal = 0;
		} else {
			voteTotal = votesArray.reduce((acc, cVal) => {
				return acc + cVal;
			});
		}
		console.log("New vote total:", voteTotal);
		res.json({ voteTotal });
	}));

router.get(
	"/:id(\\d+)/edit",
	asyncHandler(async (req, res) => {
		let post = await Post.findOne({
			where: { id: req.params.id },
			include: { model: Topic },
		});
		let topics = await Topic.findAll();
		topics = topics.map((e) => e.dataValues);
		console.log(topics);
		post = post.dataValues;
		post.Topic = post.Topic.dataValues;

		res.render("editPost", { post, topics });
	})
);

router.put(
	"/:id(\\d+)/edit",
	asyncHandler(async (req, res) => {
		let { title, content, imgUrl } = req.body;
		let post = await Post.findByPk(req.params.id);
		post.title = title;
		post.content = content;
		post.imgUrl = imgUrl;
		await post.save();
		res.json({ post });
	})
);
module.exports = router;
