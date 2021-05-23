const mongoose = require('mongoose');

const psatSchema = new mongoose.Schema(
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

module.exports = mongoose.model('psat', psatSchema);