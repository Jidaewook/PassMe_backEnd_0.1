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
                }, 
                like: [
                    {
                        user: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'user'
                        },
                        date: {
                            type: Date,
                            default: Date.now
                        }  
                    }
                ]
            }
        ],
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user'
                },
            }
        ],
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