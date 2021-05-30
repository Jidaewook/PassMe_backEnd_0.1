const { response } = require('express');
const express = require('express');
const router = express.Router();

const bbsModel = require('../model/bbsModel');

router.get('/', (req, res) => {
    bbsModel
        .find()
        .then(items => {
            res.status(200).json({
                message: 'Successful GET BBS',
                count: items.length,
                results: items
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err.message
            });
        });
});

router.post('/', (req, res) => {
    const bbsFields = {};

    if(req.body.title) bbsFields.title = req.body.title;
    if(req.body.desc) bbsFields.desc = req.body.desc;
    if(req.body.url) bbsFields.url = req.body.url;
    if(typeof req.body.category !== 'undefined'){
        bbsFields.category = req.body.category
    }
    if(typeof req.body.tag !== 'undefined'){
        bbsFields.tag = req.body.tag.split(',')
    }

    const newBbs = new bbsModel(bbsFields);
    newBbs
        .save()
        .then(item => {
            res.status(200).json({
                message: 'Succeful POST BBS',
                results: item
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        });
});

router.get('/:bbsModelId', (req, res) => {
    bbsModel
        .findById(req.params.bbsModelId)
        .then(item => {
            res.status(200).json({
                message: 'Succesful GET BBS DETAIL',
                results: item
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        });
});

router.patch('/', (req, res) => {
    bbsModel
        .findByIdAndUpdate(req.params.bbsFields)
        .then()
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        });
});

router.delete('/', (req, res) => {
    bbsModel
        .findByIdAndDelete(
            {_id: req.params.bbsModelId},
            {$set: {title, desc, url, category, tag}}
        )
        .then(() => {
            res.status(200).json({
                message: 'Successful BBS DELETE'
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        });
});

module.exports = router;