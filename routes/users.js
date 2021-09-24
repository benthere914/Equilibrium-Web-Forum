var express = require('express');
const { validationResult } = require('express-validator');
const { asyncHandler, csrfProtection, bcrypt, check } = require('../utils');
const {userEditValidators } = require('./index.js')
var router = express.Router();
const db = require('../db/models');
const { logoutUser } = require('../auth');
const {User, Post, Topic, TopicFollow, UserFollow, Vote, Comment} = db;

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});


router.get("/userid", (req, res) => {

  if (req.session.auth){
      if (req.session.auth.userId){
        return res.json({userId: req.session.auth.userId})
      }
  }
    res.json({userId: NaN})
  });

router.get("/:id(\\d+)",asyncHandler( async (req, res) => {
    let userId;
    if (req.session.auth){userId = req.session.auth.userId}
    else {userId = NaN}
    let user = await User.findByPk(req.params.id, {include: Topic});
    if (!user){return res.render('404Error', {errors: ['This page does not exist']})}
    let posts = await Post.findAll({where: {userId: user.id}, include: [Topic, User]})
    user = user.dataValues;
    posts = posts.map(e => {
        let data = e.dataValues;
        data.content =  data.content.slice(0, 100);
        return data});
        const sameUser = (Number(req.params.id) === Number(userId));


    res.render('profilePage', {user, posts, sameUser, loggedIn: res.locals.authenticated, userId});
}))

const passWordValidators = [
check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')
        .isLength({ max: 50 })
        .withMessage('Password must not be more than 50 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password')
        .isLength({ max: 50 })
        .withMessage('Confirm Password must not be more than 50 characters long')
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Confirm Password does not match Password');
        }
        return true;
        })];

router.post('/:userId(\\d+)/edit',csrfProtection, passWordValidators, asyncHandler((async(req, res)=>{
  const {username, oldPassword, password, confirmPassword, biography, imgUrl} = req.body;
    let userId = req.session.auth.userId;
    const errors = [];
    const validationErrors = validationResult(req);
    const user = await User.findByPk(userId);

    if (username !== user.username) {
      let userToCheck = await User.findOne({where: {username}});
        if (userToCheck !== null){
          errors.push(`Name already in use`);
        }
    }
    if (oldPassword.length) {
      const passwordMatches = await bcrypt.compare(oldPassword, user.hashedPassword.toString());
      if (!passwordMatches) {

        errors.push(`Incorrect password`);

      } errors.push(validationErrors.array().map(err => err.msg));

    }
    if (errors.length){
      return res.render("my-account", {user, errors, csrfToken: req.csrfToken()})
    }
    const newHashedPassword = await bcrypt.hash(password, 10);
    await user.update({hashedPassword: newHashedPassword, username, biography, imgUrl})
    res.redirect(`/users/${userId}`);

})));

router.delete('/:id(\\d+)', asyncHandler(async (req, res)=>{
    let userId;
    if (req.session.auth){userId = req.session.auth.userId;}
    if (!userId || String(userId) !== String(req.params.id)){return res.json({error: "Permission Denied"}).status(403)}
    let user = await User.findByPk(req.params.id);
    if (user.username === "John Doe"){
        return res.json({error: "Cannot Delete This User"})
    }
    if (!user){return res.json({error: "Permission Denied"}).status(403)}
    let passwordMatches = await bcrypt.compare(req.body.password, user.hashedPassword.toString());
    if (passwordMatches){
        try {
                let posts = await Post.findAll({where: {userId}})
                posts.forEach(async post => {
                    let comments = await Comment.findAll({where: {postId: post.dataValues.id}})
                    comments.forEach(async comment => comment.destroy())
                    let votes = await Vote.findAll({where: {postId: post.dataValues.id}})
                    votes.forEach(async vote => vote.destroy())
                    await post.destroy()
                })

                let usersComments = await Comment.findAll({where: {userId}})
                usersComments.forEach(async userComment => userComment.destroy())

                let usersVotes = await Vote.findAll({where: {userId}})
                usersVotes.forEach(async usersVote => usersVote.destroy())

                let TopicFollows = await TopicFollow.findAll({where: {userId}})
                TopicFollows.forEach(async TopicFollow => TopicFollow.destroy())

                let userFollowsU = await UserFollow.findAll({where: {userId}})
                userFollowsU.forEach(async userFollowU => userFollowU.destroy())

                let userFollowsF = await UserFollow.findAll({where: {followId: userId}})
                userFollowsF.forEach(async userFollowF => userFollowF.destroy())

                logoutUser(req, res);
                await user.destroy();
            } catch (error) {
                return res.json({error: "Server Error, Please Try again Later"})
            }

        return res.json({message: "Successfully Deleted"})}
    else {res.json({error: "Invalid Password"})};
}))

module.exports = router;
