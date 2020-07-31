const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('/posts')
});

router.get('/new', (req, res, next) => {
    res.send('/posts/new')
});

router.post('/', (req, res, next) => {
    res.send('CREATE /posts')
});

router.get('/:id', (req, res, next) => {
    res.send('SHOW /posts')
});

router.get('/:id/edit', (req, res, next) => {
    res.send('EDIT /posts')
});

router.put('/:id', (req, res, next) => {
    res.send('UPDATE /posts')
});

router.delete('/:id', (req, res, next) => {
    res.send('DELETE /posts')
});

module.exports = router