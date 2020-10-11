const express = require('express');
const router = express.Router();
const multer = require('multer')
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage })
const { asyncErrorHandler, isLoggedIn, isAuthor } = require('../middleware/index')
const { postIndex, postNew, postCreate, postShow, postEdit, postUpdate, postDestroy } = require('../controllers/posts')


router.get('/', asyncErrorHandler(postIndex));

router.get('/new', isLoggedIn, postNew);

router.post('/', isLoggedIn, upload.array('images', 4), asyncErrorHandler(postCreate));

router.get('/:id', asyncErrorHandler(postShow));

router.get('/:id/edit',isLoggedIn,  asyncErrorHandler(isAuthor), postEdit);

router.put('/:id', isLoggedIn, asyncErrorHandler(isAuthor), upload.array('images', 4), asyncErrorHandler(postUpdate));

router.delete('/:id',isLoggedIn,  asyncErrorHandler(isAuthor), asyncErrorHandler(postDestroy));

module.exports = router