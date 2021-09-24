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
const {convertTime} = require('../utils');

router.get(
	"/:id(\\d+)",
	restoreUser,
	csrfProtection,
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
            order: [['createdAt', 'desc']]
		});
		comments = comments.map((e) => {
			let data = e.dataValues;
			data.User = data.User.dataValues;
            let day = convertTime(data.updatedAt.getDate(), 'date');
            let month = convertTime(data.updatedAt.getMonth(), 'month');
            let year = convertTime(data.updatedAt.getYear(), 'year');
            let hour = convertTime(data.updatedAt.getHours(), 'hours');
            let minutes = convertTime(data.updatedAt.getMinutes(), 'minutes');
            let format = convertTime(data.updatedAt.getHours(), 'format')
            data.date = `${month}, ${day}, ${year}, ${hour}:${minutes} ${format}`;
            data.matches = (data.User.id === userId)
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
			return acc+cVal;
		});
	}

    let postMatches = false;

    if (req.session.auth){
        if (req.session.auth.userId){
            postMatches = (post.User.id === req.session.auth.userId);
        }
    }
		post = post.dataValues;
		post.User = post.User.dataValues;
		post.Topic = post.Topic.dataValues;
		let userVoteStatus;
		if (!userId){
			userVoteStatus = 0;
		} else {
		const userVote = await Vote.findOne({
			where: {
				postId: postId,
				userId: userId,
			},
		});

		if (!userVote){
			userVoteStatus = 0;
		} else {
			userVoteStatus = userVote.dataValues.voteCount;
		}
	}

		res.render("post", {
			post,
			postId,
			author: post.User,
			comments,
			loggedIn: res.locals.authenticated,
      		userId,
			voteTotal,
			userVoteStatus,
			csrfToken: req.csrfToken(),
      		postMatches
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
	restoreUser,
	asyncHandler(async (req, res) => {
		const postId = req.params.id;
		const { userId, vote } = req.body;
		if(!userId){

		}
		const userVote = await Vote.findOne({
			where: {
				postId: postId,
				userId: userId
			}
		});
		let userVoteStatus;
		if (!userVote) {
			 await Vote.create({
				userId,
				postId,
				voteCount: vote
			});
			userVoteStatus = vote;
		} else if (userVote.dataValues.voteCount !== vote) {
			await userVote.update({
				voteCount: vote,
			});
			userVoteStatus = vote;
		} else if (userVote.dataValues.voteCount === vote){
			await userVote.update({
				voteCount: 0,
			});
			userVoteStatus = 0;
		}
		const currentPostVoteCount = await Vote.findAll({
			where: {
				postId: postId
			}
		});
		let currentVoteTotal;

		const votesArray = currentPostVoteCount.map(
			(vote) => vote.dataValues.voteCount
		);
		if (votesArray.length === 0) {
			currentVoteTotal = 0;
		} else {
			currentVoteTotal = votesArray.reduce((acc, cVal) => {
				return acc + cVal;
			});
		}
		res.json({ currentVoteTotal, userVoteStatus });
	}));

router.get("/:id(\\d+)/edit", asyncHandler(async (req, res, next) => {
    let userId;
    if (req.session.auth){
        userId = req.session.auth.userId;
    }
    if (!userId){return res.redirect('/404')}
    let post = await Post.findOne({where: {id: req.params.id}, include: {model: Topic}});
    let topics = await Topic.findAll();
		if (topics == null || post == null){
			return next()
		}
    topics = topics.map(e => e.dataValues)
    post = post.dataValues;
    post.Topic = post.Topic.dataValues;
    if (post.userId !== userId){
        return res.redirect('/404')
    }

		res.render("editPost", { post, topics, loggedIn: res.locals.authenticated, });
	})
);


router.put("/:id(\\d+)/edit", asyncHandler(async (req, res) => {
    let {title, content, imgUrl} = req.body;
    let post = await Post.findByPk(req.params.id);
    post.title = title;
    post.content = content;
    post.imgUrl = imgUrl;
    await post.save();
    res.json({post})
}));

router.post("/:id(\\d+)/comments", asyncHandler(async (req, res) => {
    let {comment} = req.body;
    let authorId = 0;
    if (req.session.auth){
        if (req.session.auth.userId){
            authorId = req.session.auth.userId
        }
    }
    let newComment = await Comment.create({userId: authorId, postId: req.params.id, comment, createdAt: new Date(), updatedAt: new Date()})
    let author = await User.findByPk(authorId);
    author = author.dataValues;
    author = author.username
    res.json({date: new Date(), commentContent: comment, author})
}));

router.delete("/:id(\\d+)/delete", asyncHandler(async(req,res)=> {

	const postId = parseInt(req.params.id, 10);
	let postToDelete = await Post.findByPk(postId);
	await postToDelete.destroy();
	res.json({post: `${postId}`})
}));

module.exports = router;
