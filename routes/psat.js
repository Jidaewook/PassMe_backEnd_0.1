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
    if(req.body.url) psatFields.url = req.body.url;
    if(typeof req.body.genres !== 'undefined'){
        psatFields.genres = req.body.genres.split(',')
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
    res.json({
        msg: 'UPDATE PSAT'
    })
});

router.delete('/', (req, res) => {
    res.json({
        msg: 'DELETE PSAT'
    })
});

module.exports = router;