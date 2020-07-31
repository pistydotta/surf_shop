const express = require('express');
const router = express.Router({mergeParams: true});

router.get('/', (req, res, next) => {
    res.send('/reviews')
});

router.post('/', (req, res, next) => {
    res.send('CREATE review')
});

router.get('/:review_id/edit', (req, res, next) => {
    res.send('EDIT review')
});

router.put('/:review_id', (req, res, next) => {
    res.send('UPDATE review')
});

router.delete('/:review_id', (req, res, next) => {
    res.send('DELETE review')
});

module.exports = router