const express = require('express');
const router = express.Router();
const {
	asyncHandler,
	handleValidationErrors,
	check,
	validationResult,
	bcrypt,
	csrfProtection,
} = require('../utils');
const { restoreUser } = require('../auth');
const db = require('../db/models');
const { Post, User, Topic, Comment, Vote } = db;
const { convertTime } = require('../utils');
const { Sequelize } = require('../db/models');
const Op = Sequelize.Op;

const cutContent = (content, amount) => {
	if (content.length > amount) {
		while (content.length > amount) {
			content = content.split(' ');
			content = content.slice(0, content.length - 1);
			content = content.join(' ');
		}
		content += '...';
	}
	return content;
};
router.get(
	'/:id(\\d+)',
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
		let postsByTopic = await Post.findAll({
			where: { topicId: post.dataValues.topicId },
			include: [{ model: User }, { model: Topic }],
		});
		let postsByAuthor = await Post.findAll({
			where: { userId: post.dataValues.userId },
			include: [{ model: User }, { model: Topic }],
		});
		let posts = [...postsByTopic, ...postsByAuthor];
		let output = {};
		for (let i = 0; i < posts.length; i++) {
			posts[i] = posts[i].dataValues;
            let addToOutput = true;
            if (addToOutput && (output[posts[i].title])){addToOutput = false;}
            if (addToOutput && (Object.keys(output).length > 3)) {addToOutput = false;}
			if (addToOutput && (output[posts[i].title])) {addToOutput = false;}
            if (addToOutput && (posts[i].id === post.id)) {addToOutput = false;}
            if (addToOutput && posts[i].content.length < 25){addToOutput = false;}
            if (addToOutput && posts[i].title.length < 7){addToOutput = false;}

			posts[i].content = cutContent(posts[i].content, 75);
			posts[i].title = cutContent(posts[i].title, 25);
            if (addToOutput && posts[i].title[posts[i].title.length -1] > 15){addToOutput = false;}
            if (addToOutput && posts[i].title[posts[i].title.length -1] > 15){addToOutput = false;}
            if (addToOutput){output[posts[i].title] = posts[i];}



		}
		posts = [...Object.values(output)].slice(0,3)

		let updatedTime = post.updatedAt;
		let day = convertTime(updatedTime.getDate(), 'date');
		let month = convertTime(updatedTime.getMonth(), 'month');
		let year = convertTime(updatedTime.getYear(), 'year');
		let hour = convertTime(updatedTime.getHours(), 'hours');
		let minutes = convertTime(updatedTime.getMinutes(), 'minutes');
		let format = convertTime(updatedTime.getHours(), 'format');
		const postUpdateTime = `${month}, ${day}, ${year}, ${hour}:${minutes} ${format}`;
		let comments = await Comment.findAll({
			where: { postId },
			include: { model: User },
			order: [['createdAt', 'desc']],
		});
		comments = comments.map((e) => {
			let data = e.dataValues;
			data.User = data.User.dataValues;
			let day = convertTime(data.updatedAt.getDate(), 'date');
			let month = convertTime(data.updatedAt.getMonth(), 'month');
			let year = convertTime(data.updatedAt.getYear(), 'year');
			let hour = convertTime(data.updatedAt.getHours(), 'hours');
			let minutes = convertTime(data.updatedAt.getMinutes(), 'minutes');
			let format = convertTime(data.updatedAt.getHours(), 'format');
			data.date = `${month}, ${day}, ${year}, ${hour}:${minutes} ${format}`;
			data.matches = data.User.id === userId;
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

		let postMatches = false;

		if (req.session.auth) {
			if (req.session.auth.userId) {
				postMatches = post.User.id === req.session.auth.userId;
			}
		}
		post = post.dataValues;
		post.User = post.User.dataValues;
		post.Topic = post.Topic.dataValues;
		let userVoteStatus;
		if (!userId) {
			userVoteStatus = 0;
		} else {
			const userVote = await Vote.findOne({
				where: {
					postId: postId,
					userId: userId,
				},
			});

			if (!userVote) {
				userVoteStatus = 0;
			} else {
				userVoteStatus = userVote.dataValues.voteCount;
			}
		}

		res.render('post', {
			posts,
			post,
			postId,
			author: post.User,
			comments,
			loggedIn: res.locals.authenticated,
			userId,
			voteTotal,
			userVoteStatus,
			postUpdateTime,
			csrfToken: req.csrfToken(),
			postMatches,
		});
	})
);

router.get(
	'/create',
	csrfProtection,
	restoreUser,
	asyncHandler(async (req, res, next) => {
		if (res.locals.authenticated === true) {
			const userId = req.session.auth.userId;
			const user = await User.findByPk(userId);
			const topics = await Topic.findAll();
			res.render('create-post', {
				user,
				topics,
				loggedIn: res.locals.authenticated,
				csrfToken: req.csrfToken(),
				userId: req.session.auth.userId,
			});
		} else {
			next()
		}
	})
);

router.post(
	'/create',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { userId, topicId, title, content, imgUrl } = req.body;
		if (imgUrl === '') {
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
	'/:id/votes',
	restoreUser,
	asyncHandler(async (req, res) => {
		const postId = req.params.id;
		const { userId, vote } = req.body;
		if (!userId) {
		}
		const userVote = await Vote.findOne({
			where: {
				postId: postId,
				userId: userId,
			},
		});
		let userVoteStatus;
		if (!userVote) {
			await Vote.create({
				userId,
				postId,
				voteCount: vote,
			});
			userVoteStatus = vote;
		} else if (userVote.dataValues.voteCount !== vote) {
			await userVote.update({
				voteCount: vote,
			});
			userVoteStatus = vote;
		} else if (userVote.dataValues.voteCount === vote) {
			await userVote.update({
				voteCount: 0,
			});
			userVoteStatus = 0;
		}
		const currentPostVoteCount = await Vote.findAll({
			where: {
				postId: postId,
			},
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
	})
);

router.get(
	'/:id(\\d+)/edit',
	asyncHandler(async (req, res, next) => {
		let userId;
		if (req.session.auth) {
			userId = req.session.auth.userId;
		}
		if (!userId) {
			return res.redirect('/404');
		}
		let post = await Post.findOne({
			where: { id: req.params.id },
			include: { model: Topic },
		});
		let topics = await Topic.findAll();
		if (topics == null || post == null) {
			return next();
		}
		topics = topics.map((e) => e.dataValues);
		post = post.dataValues;
		post.Topic = post.Topic.dataValues;
		if (post.userId !== userId) {
			return res.redirect('/404');
		}

		res.render('editPost', {
			post,
			topics,
			loggedIn: res.locals.authenticated,
		});
	})
);

router.put(
	'/:id(\\d+)/edit',
	asyncHandler(async (req, res) => {
		try {
			let { title, content, imgUrl, topicId } = req.body;
			let post = await Post.findByPk(req.params.id);
			if (!Number(topicId)) {
				let topic = await Topic.findOne({ where: { name: topicId } });
				topic = topic.dataValues;
				topicId = topic.id;
			}
			post.title = title;
			post.content = content;
			post.imgUrl = imgUrl;
			post.topicId = topicId;
			await post.save();
			res.json({ post });
		} catch (error) {
			console.log(error);
		}
	})
);

router.post(
	'/:id(\\d+)/comments',
	asyncHandler(async (req, res) => {
		let { comment } = req.body;
		let authorId = 0;
		if (req.session.auth) {
			if (req.session.auth.userId) {
				authorId = req.session.auth.userId;
			}
		}
		let newComment = await Comment.create({
			userId: authorId,
			postId: req.params.id,
			comment,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		let author = await User.findByPk(authorId);
		author = author.dataValues;
		author = author.username;
		res.json({ date: new Date(), commentContent: comment, author });
	})
);

router.delete(
	'/:id(\\d+)/delete',
	asyncHandler(async (req, res) => {
		let success = false;
		try {
			const postId = parseInt(req.params.id, 10);
			let postToDelete = await Post.findByPk(postId);
			let comments = await Comment.findAll({
				where: { postId: postToDelete.dataValues.id },
			});
			comments.forEach(async (comment) => comment.destroy());
			let votes = await Vote.findAll({
				where: { postId: postToDelete.dataValues.id },
			});
			votes.forEach(async (vote) => vote.destroy());
			await postToDelete.destroy();
			success = true;
		} catch (error) {}
		res.json({ success });
	})
);

module.exports = router;
