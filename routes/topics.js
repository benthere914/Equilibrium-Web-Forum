const express = require('express');
const router = express.Router();
const db = require('../db/models');
const {Topic} = db;
const { asyncHandler, handleValidationErrors, check } = require('../utils');
router.use(express.json());

router.get('/:id', asyncHandler(async(req,res,next)=>{
  const topicId = req.params.id;
  console.log(req.params.id)
  const topics = await Topic.findAll({where: {
    id: topicId
  }})

  res.status(200).json(topics);
}))




module.exports = router;
