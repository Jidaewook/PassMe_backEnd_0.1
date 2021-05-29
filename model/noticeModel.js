const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
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
    }
);

module.exports = mongoose.model('notice', noticeSchema);