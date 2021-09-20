var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', restoreUser, function(req, res, next) {

    console.log(res.locals);
  res.render('layout', {loggedIn: res.locals.authenticated});
});

<<<<<<< Updated upstream
=======
router.get('/sign-up', function(req, res, next) {
    res.render('index', { title: 'a/A Express Skeleton Home' });
  });

router.get('/log-in', csrfProtection, function(req, res, next) {
    res.render('log-in', { title: 'log-in',  csrfToken: req.csrfToken()});
  });

router.post('/sign-up',
    // csrfProtection,
    userValidators,
    handleValidationErrors,
    asyncHandler(async (req, res, next) => {
        let {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await User.create({username, hashedPassword});
        console.log(req.session);
        loginUser(req, res, user);
        res.redirect('/');

  }));

router.post('/log-in', loginValidators, csrfProtection, asyncHandler( async (req, res, next) => {
    const {username, password} = req.body;
    let error = [];
    const validatorErrors = validationResult(req);
    console.log(validatorErrors)
    if (validatorErrors.isEmpty()){
        console.log(123)
        const user = await User.findOne({where: {username}})
        const passwordMatches = await bcrypt.compare(password, user.hashedPassword.toString());
        if (passwordMatches) {loginUser(req, res, user); return res.redirect('/')}
        error.push('Incorrect login credentials')
    }
    else {
        error = validatorErrors.array().map(e => e.msg)
    }

    res.render('log-in', {csrfToken: req.csrfToken(), username, error})
    // res.redirect('/')
    res.send('abc')
}));

router.post('/log-out', asyncHandler(async (req, res, next) => {
    logoutUser(req, res);
    res.redirect('/');
}))

>>>>>>> Stashed changes
module.exports = router;
