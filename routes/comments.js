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
    let userId;
    let err;
    if (req.session.auth){userId = req.session.auth.userId;}
    let currentComment = await Comment.findByPk(req.params.id);
    if (currentComment.userId !== userId){err = 'Permission Denied'}
    if (currentComment && !err){
        currentComment.destroy();
        return res.json({"message": "successfully Destroyed"})
    }else{
        return res.json({"message": "Permission Denied"}).status(403)
    }
}))

router.put("/:id(\\d+)", asyncHandler(async (req, res) => {
    let userId;
    let err;
    if (req.session.auth){userId = req.session.auth.userId;}
    let currentComment = await Comment.findByPk(req.params.id);
    if (currentComment.userId !== userId){err = 'Permission Denied'}
    currentComment.comment = req.body.comment;
    currentComment.updatedAt = new Date();
    if (!err){
        await currentComment.save()
        return res.json({newCommentText: req.body.comment, date: currentComment.updatedAt, err})
    }
}))


module.exports = router
