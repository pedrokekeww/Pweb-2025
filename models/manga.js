const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
    balloonId: Number,
    value: String
});

const MangaSchema = new mongoose.Schema({
    templateId: Number,
    texts: [TextSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Manga = mongoose.model("Manga", MangaSchema);

module.exports = Manga;
