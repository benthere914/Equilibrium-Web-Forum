const express = require('express');
const router = express.Router();
const db = require('../db/models');
const {Topic, TopicFollow} = db;
const { asyncHandler, handleValidationErrors, check } = require('../utils');
router.use(express.json());

router.get('/:id', asyncHandler(async(req,res,next)=>{
  const topicId = req.params.id;
  const topics = await Topic.findAll({where: {
    id: topicId
  }})

  res.status(200).json({topics});
}))

router.delete('/:id(\\d+)', asyncHandler(async(req,res,next)=>{
  const topicId = parseInt(req.params.id, 10);
  let topicToDelete = await TopicFollow.findOne({where: {topicId}})
  await topicToDelete.destroy();
  res.json({unfollowed: `${topicId}`});
}))


module.exports = router;
