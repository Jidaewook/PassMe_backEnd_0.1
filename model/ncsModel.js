const mongoose = require('mongoose');

const ncsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        geners: [String],
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

module.exports = mongoose.model('ncs', ncsSchema);