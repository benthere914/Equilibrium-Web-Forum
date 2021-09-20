const asyncHandler = (handler) => (req, res, next) =>handler(req, res, next).catch(next);
const {check, validationResult} = require('express-validator');
const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => {console.log(error.msg); return error.msg});
        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        next(err);
    }
    next();
    // TODO: Generate error object and invoke next middleware function
  };
  const bcrypt = require('bcryptjs')

  const csrf = require('csurf');

  const csrfProtection = csrf({ cookie: true });
  module.exports = {asyncHandler, handleValidationErrors, check, validationResult, bcrypt, csrfProtection}
