const express = require('express');
const router = express.Router();
const multer = require('multer')
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage })
const { asyncErrorHandler } = require('../middleware/index')
const {postIndex, postNew, postCreate, postShow, postEdit, postUpdate, postDestroy} = require('../controllers/posts')


router.get('/', asyncErrorHandler(postIndex));

router.get('/new', postNew);

router.post('/', upload.array('images', 4), asyncErrorHandler(postCreate));

router.get('/:id', asyncErrorHandler(postShow));

router.get('/:id/edit',asyncErrorHandler(postEdit));

router.put('/:id', upload.array('images', 4), asyncErrorHandler(postUpdate));

router.delete('/:id', asyncErrorHandler(postDestroy));

module.exports = router