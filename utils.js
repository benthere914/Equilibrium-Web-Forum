const asyncHandler = (handler) => (req, res, next) =>handler(req, res, next).catch(next);
const {check, validationResult} = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg);

        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        return next(err);
    }
    next();
  };
  const bcrypt = require('bcryptjs')

  const csrf = require('csurf');
  const csrfProtection = csrf({ cookie: true });

  function convertTime(number, format){
    console.log(number)
      number = Number(number);
      if (Number.isNaN(number)){return null}
      if (format === "date"){
          if (number < 0 || number > 31){return ""}
          if (number < 10){return `0${number}`}
          if (number > 10){return number}
      }
      if (format === "month"){
        if (number < 0 || number > 12){return ""}
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return months[number]
      }
      if (format === "year"){
        return 2021
      }
      if (format === "hours"){
        if (number < 0 || number > 24){return "00"}
        if (number < 10){return `0${number}`}
        if (number > 12){return `${Number(number) - 12}`}

        if (number <= 12){return `${Number(number)}`}
        if (number === 24){return `${12}`}
      }
      if (format === "minutes"){
        if (number < 0 || number > 60){return "00"}
        if (number < 10){return `0${number}`}
        if (number === 60){return `00`}
        if (number >= 10){return `${number}`}
      }

      if (format === "format"){
        if (number < 0 || number > 24){return ""}
        if (number <= 11 || number === 24){return `AM`}
        if (number >= 12){return `PM`}
      }
  }

  module.exports = {asyncHandler, handleValidationErrors, check, validationResult, bcrypt, csrfProtection, convertTime}
