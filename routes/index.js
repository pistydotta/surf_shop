const express = require('express');
const router = express.Router();
const { landingPage, postRegister, postLogin, getLogout } = require("../controllers/index")
const { asyncErrorHandler } = require("../middleware/index")

/* GET home page. */
router.get('/', asyncErrorHandler(landingPage));

router.get('/register', (req, res, next) => {
  res.send('get /register')
});

router.post('/register', asyncErrorHandler(postRegister));

router.get('/login', (req, res, next) => {
  res.send('get /login')
});

router.post('/login', postLogin)

router.get('/logout', getLogout)

router.get('/profile', (req, res, next) => {
  res.send('get /profile')
});

router.put('/profile/:user_id', (req, res, next) => {
  res.send('put /profile')
});

router.get('/forgot', (req, res, next) => {
  res.send('get /forgot-password')
});

router.put('/forgot', (req, res, next) => {
  res.send('put /forgot-password')
});

router.get('/reset/:token', (req, res, next) => {
  res.send('get /reset-password')
});

router.put('/reset/:token', (req, res, next) => {
  res.send('put /reset-password')
});

module.exports = router;
