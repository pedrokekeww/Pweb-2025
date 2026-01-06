var express = require('express');
var router = express.Router();
const Manga = require("../models/manga");

/* GET gallery page. */
router.get('/', async function (req, res, next) {
    try {
        const memes = await Manga.find().sort({ createdAt: -1 });
        res.render('gallery', { title: 'User Gallery', memes });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching memes");
    }
});

module.exports = router;

