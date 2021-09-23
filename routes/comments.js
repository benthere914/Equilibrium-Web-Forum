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


router.get("/latest", asyncHandler(async (req, res) => {
    let latestComment = await Comment.findAll({limit: 1, order: [['createdAt', 'DESC']]})
    latestComment = latestComment[0].dataValues;
    console.log(latestComment);
    res.json(latestComment.id)
}))


module.exports = router
