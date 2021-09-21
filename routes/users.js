var express = require('express');
var router = express.Router();

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

module.exports = router;
