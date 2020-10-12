const express = require('express');
const router = express.Router();
const multer = require('multer')
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })
const { landingPage, getRegister, getLogin, postRegister, postLogin, getLogout, getProfile, updateProfile } = require("../controllers/index")
const { asyncErrorHandler, isLoggedIn, isValidPassword, changePassword } = require("../middleware/index")

/* GET home page. */
router.get('/', asyncErrorHandler(landingPage));

router.get('/register', getRegister);

router.post('/register', upload.single('image'), asyncErrorHandler(postRegister));

router.get('/login', getLogin);

router.post('/login', asyncErrorHandler(postLogin))

router.get('/logout', getLogout)

router.get('/profile', isLoggedIn, asyncErrorHandler(getProfile));

router.put('/profile', isLoggedIn, upload.single('image'), asyncErrorHandler(isValidPassword), asyncErrorHandler(changePassword), asyncErrorHandler(updateProfile));

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
