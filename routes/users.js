var express = require('express');
const { asyncHandler } = require('../utils');
var router = express.Router();
const db = require('../db/models');
const {User, Post} = db;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get("/userid", (req, res) => {
  if (req.session.auth.userId){
    res.json({userId: req.session.auth.userId})
  } else
  {
    res.json({userId: NaN})
    }
  })

router.get("/:id(\\d+)",asyncHandler( async (req, res) => {
    let user = await User.findByPk(req.params.id);
    if (!user){return res.render('404Error', {errors: ['This page does not exist']})}
    let posts = await Post.findAll({where: {userId: user.id}})
    user = user.dataValues;
    posts = posts.map(e => {
        let data = e.dataValues;
        data.content =  data.content.slice(0, 100);
        return data});
        console.log(user)
        const sameUser = (Number(req.params.id) === Number(req.session.auth.userId));
    res.render('profilePage', {user, posts, sameUser, loggedIn: res.locals.authenticated, userId: req.session.auth.userId});
}))


module.exports = router;
