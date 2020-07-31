const express = require('express');
const router = express.Router();
const { postRegister } = require("../controllers/index")

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Surf Shop - Home' });
});

router.get('/register', (req, res, next) => {
  res.send('get /register')
});

router.post('/register', postRegister);

router.get('/login', (req, res, next) => {
  res.send('get /login')
});

router.post('/login', (req, res, next) => {
  res.send('post /login')
});

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
