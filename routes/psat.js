const express = require('express');
const router = express.Router();

const psatModel = require('../model/psatModel');

router.get('/', (req, res) => {
    psatModel
        .find()
        .then(items => {
            res.status(200).json({
                message: 'Successful Get PSAT',
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
    const psatFields = {};

    if(req.body.title) psatFields.title = req.body.title;
    if(req.body.desc) psatFields.desc = req.body.desc;
    if(req.body.rating) psatFields.rating = req.body.rating;
    if(req.body.professor) psatFields.professor = req.body.professor;
    if(req.body.comment) psatFields.comment = req.body.comment;
    if(req.body.like) psatFields.like = req.body.like;
    if(req.body.url) psatFields.url = req.body.url;
    if(req.body.poster) psatFields.poster = req.body.poster;
    if(req.body.backdrop) psatFields.backdrop = req.body.backdrop;
    if(typeof req.body.genres_ids !== 'undefined'){
        psatFields.genres_ids = req.body.genres_ids.split(',')
    }

    const newPsat = new psatModel(psatFields);
    newPsat 
        .save()
        .then(item => {
            res.status(200).json({
                message: 'succcessful PSAT POST',
                results: item
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
});

router.get('/:psatModelId', (req, res) => {
    psatModel
        .findById(req.params.psatModelId)
        .then(item => {
            res.status(200).json({
                message: 'Successful Get PSAT',
                results: item
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err.message
            });
        });
});

router.patch('/', (req, res) => {
    psatModel
        .findByIdAndUpdate(req.params.psatModelId)
        .then()
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        });
});;

router.delete('/', (req, res) => {
    psatModel
        .findByIdAndDelete(
            {_id: req.params.psatModelId},
            {$set: {title, desc, genres, rating, poster}}
        )
        .then(() => {
            res.status(200).json({
                message: 'Successful PSAT Delete'
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            });
        });
});

module.exports = router;