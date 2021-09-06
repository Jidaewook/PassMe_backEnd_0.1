const mongoose = require('mongoose');

const workbookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        answer: {

        },
        genres_ids: [String],
        rating: {
            type: Number
        },
        poster: {
            type: String
        },
        backdrop: {
            type: String
        },
        professor: {},
        comment: [],
        like: [],
        url: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('workbook', workbookSchema);