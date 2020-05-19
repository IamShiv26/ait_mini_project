const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static('public'));

router.get('/multi-blog', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'blog.html'));
});


router.get('/single-blog', (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'single-blog.html'))
});

module.exports = router;