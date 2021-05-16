
const express = require('express');
const router = express.Router();

const ncsModel = require('../model/ncsModel');

router.get('/', (req, res) => {
    ncsModel
        .find()
        .then(items => {
            res.status(200).json({
                message: 'Successful Get NCS',
                count: item.length, 
                results: items
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
})

router.post('/', (req, res) => {
    const ncsFields = {};

    if(req.body.title) ncsFields.title = req.body.title;
    if(req.body.desc) ncsFields.desc = req.body.desc;
    if(req.body.rating) ncsFields.rating = req.body.rating;
    if(req.body.professor) ncsFields.professor = req.body.professor;
    if(req.body.comment) ncsFields.comment = req.body.comment;
    if(req.body.url) ncsFields.url = req.body.url;   
    if(typeof req.body.genres !== 'undefined'){
        ncsFields.genres = req.body.genres.split(',')
    } 

    const newNcs = new ncsModel(ncsFields);
    newNcs
        .save()
        .then(item => {
            res.status(200).json({
                message: 'Successful NCS',
                results: item
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
})

router.get('/:ncsModelId', (req, res) => {
    ncsModel
        .findById(req.params.ncsModelId)
        .then(item => {
            res.status(200).json({
                message: 'Successful Get NCS',
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
    ncsModel
        .findByIdAndUpdate(req.params.ncsModelId)
        .then()
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
})

router.delete('/', (req, res) => {
    // ncsModel
    //     .findByIdAndDelete(
    //         {_id: req.params.ncsModelId},
    //         {$set: {title, desc, genres, rating, poster}}
    //     )
    //     .then(() => {
    //         res.status(200).json({
    //             message: 'Successful NCS Delete'
    //         })
    //     })
    //     .catch(err => {
    //         res.status(400).json({
    //             message: err.message
    //         });
    //     });
});




module.exports = router;
