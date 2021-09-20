const db = require('./db/models');

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  };
};

const logoutUser = (req, res) => {
    delete req.session.auth;
};

const restoreUser = async (req, res, next) => {
  // Log the session object to the console
  // to assist with debugging.
  console.log(req.session);

  if (req.session.auth) {
    const { userId } = req.session.auth;

    try {
      const user = await db.User.findByPk(userId);

      if (user) {
        res.locals.authenticated = true;
        console.log(res.locals);
        res.locals.user = user;
        next();
      }
    } catch (err) {

      res.locals.authenticated = false;
      // console.log(res.locals.authenticated);
      next(err);
    }
  } else {
    res.locals.authenticated = false;
    next();
  }
};

const requireAuth = (req, res, next) => {
    if (!res.locals.authenticated) {
      return res.redirect('/user/login');
    }
    return next();
};

module.exports = {
  loginUser,
  logoutUser,
  restoreUser,
  requireAuth,
};