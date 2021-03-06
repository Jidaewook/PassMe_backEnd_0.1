const express = require('express');
const router = express.Router();

const noticeModel = require('../model/noticeModel');

router.get('/', (req, res) => {
    noticeModel
        .find()
        .sort({createdAt: -1})
        .then(items => {
            res.status(200).json({
                message: 'Successful Get Notice',
                count: items.length,
                results: items
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
});

router.post('/', (req, res) => {
    const noticeFields = {};

    if(req.body.title) noticeFields.title = req.body.title;
    if(req.body.desc) noticeFields.desc = req.body.desc;
    if(req.body.rating) noticeFields.rating = req.body.rating;
    if(req.body.professor) noticeFields.professor = req.body.professor;
    if(req.body.poster) noticeFields.poster = req.body.poster;
    if(req.body.backdrop) noticeFields.backdrop = req.body.backdrop;
    if(req.body.comment) noticeFields.comment = req.body.comment;
    if(req.body.like) noticeFields.like = req.body.like;
    if(req.body.url) noticeFields.url = req.body.url;   
    if(typeof req.body.genres_ids !== 'undefined'){
        noticeFields.genres_ids = req.body.genres_ids.split(',')
    } 

    const newNotice = new noticeModel(noticeFields);
    newNotice
        .save()
        .then(item => {
            res.status(200).json({
                message: 'Succseeful Notice',
                results: item
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
});

router.get('/:noticeModelId', (req, res) => {
    noticeModel
        .findById(req.params.noticeModelId)
        .then(item => {
            res.status(200).json({
                message: 'Successful Get NOTICE',
                results: item
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err.message
            });
        });
});

router.delete('/:id', (req, res) => {
    noticeModel
        .findByIdAndDelete(req.params.id)
        .then(() => {
            res.json(true)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
});

router.patch('/', (req, res) => {
    noticeModel
        .findByIdAndUpdate(req.params.noticeModelId)
        .then()
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        });
});;



module.exports = router;