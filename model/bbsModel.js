const mongoose = require('mongoose');

const bbsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true

        },
        desc: {
            type: String,
            required: true
        },
        category: {
            type: [String],
            required: true
        }, 
        likes: [],
        comment: [],
        tag: [String],
        attached: {
            type: String
        },
        url: {
            type: String
        }, 
        thumb: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('bbs', bbsSchema);