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
        comment: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user'
                },
                text: {
                    type: String,
                    required: true
                },
                name: {
                    type: String
                },
                avatar: {
                    type: String
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        like: [],
        url: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('psat', psatSchema);