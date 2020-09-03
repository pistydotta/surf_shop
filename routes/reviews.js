const express = require('express');
const router = express.Router({mergeParams: true});
const {asyncErrorHandler} = require('../middleware/index')
const {reviewCreate, reviewDestroy, reviewUpdate} = require('../controllers/reviews')

router.post('/', asyncErrorHandler(reviewCreate));

router.put('/:review_id', asyncErrorHandler(reviewUpdate));

router.delete('/:review_id', (req, res, next) => {
    res.send('DELETE review')
});

module.exports = router