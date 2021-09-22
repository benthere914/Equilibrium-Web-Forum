const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler, handleValidationErrors, bcrypt, check } = require('../utils');
const db = require('../db/models');
const {TopicFollow } = db;



router.get('/topics/:userId', asyncHandler(async(req,res)=> {
  const followsTopics = await TopicFollow.findAll({where: {
    userId: req.params.userId}
  });
  if (followsTopics){
    res.json(followsTopics);
  }
  else res.send('None found');
}));


router.post('/topics', asyncHandler(async(req, res, next) =>{
  const {userId, topicId} = req.body;
  console.log(req.body);
  const newFollow = TopicFollow.build({userId, topicId});
  try {
   await newFollow.save();

    res.send("You are now following that topic.");
  }catch(e){
    next(e)
  }
}))



module.exports = router;
