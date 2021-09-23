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

router.delete("/:id(\\d+)", asyncHandler(async (req, res)=> {
    let comment = await Comment.findByPk(req.params.id);
    if (comment){comment.destroy()}
    res.json({"message": "successfully Destroyed"})
}))

router.put("/:id(\\d+)", asyncHandler(async (req, res) => {
    console.log(req.body);
    let currentComment = await Comment.findByPk(req.params.id);
    currentComment.comment = req.body.comment;
    currentComment.updatedAt = new Date();
    await currentComment.save()
    res.json(req.body.comment)
}))


module.exports = router
