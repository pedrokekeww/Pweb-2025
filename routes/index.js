var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Manga = require("../models/manga");


router.post('/memes', async (req, res) => {
  try {
    const { templateId, texts } = req.body;
    const newManga = new Manga({ templateId, texts });
    await newManga.save();
    res.status(201).json({ message: 'Manga saved successfully', id: newManga._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save manga' });
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Pragumanga' });
});


module.exports = router;
