const express = require('express');
const router = express.Router();

const alarmModel = require('../model/alarmModel');

router.get('/', (req, res) => {
    alarmModel
        .find()
        .sort({createdAt: -1})
        .then(items => {
            res.status(200).json({
                message: 'Successful Get Alarm',
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
    const alarmFields = {};

    if(req.body.title) alarmFields.title = req.body.title;
    if(req.body.desc) alarmFields.desc = req.body.desc;
    if(req.body.rating) alarmFields.rating = req.body.rating;
    if(req.body.professor) alarmFields.professor = req.body.professor;
    if(req.body.poster) alarmFields.poster = req.body.poster;
    if(req.body.backdrop) alarmFields.backdrop = req.body.backdrop;
    if(req.body.comment) alarmFields.comment = req.body.comment;
    if(req.body.like) alarmFields.like = req.body.like;
    if(req.body.url) alarmFields.url = req.body.url;   
    if(typeof req.body.genres_ids !== 'undefined'){
        alarmFields.genres_ids = req.body.genres_ids.split(',')
    } 

    const newAlarm = new alarmModel(alarmFields);
    newAlarm
        .save()
        .then(item => {
            res.status(200).json({
                message: 'Succseeful Alarm',
                results: item
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
});

router.get('/:alarmModelId', (req, res) => {
    alarmModel
        .findById(req.params.alarmModelId)
        .then(item => {
            res.status(200).json({
                message: 'Successful Get Alarm',
                results: item
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err.message
            });
        });
});

router.delete('/', (req, res) => {
    alarmModel
        .findByIdAndDelete(
            {_id: req.params.alarmModelId},
            {$set: {title, desc, genres, rating, poster}}
        )
        .then(() => {
            res.status(200).json({
                message: 'Successful Alarm Delete'
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            });
        });
});

router.patch('/', (req, res) => {
    alarmModel
        .findByIdAndUpdate(req.params.alarmModelId)
        .then()
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        });
});;



module.exports = router;