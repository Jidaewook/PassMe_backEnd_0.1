
const express = require('express');
const router = express.Router();

const workbookModel = require('../model/workbookModel');

router.get('/', (req, res) => {
    workbookModel
        .find()
        .sort({createdAt: -1})
        .then(items => {
            res.status(200).json({
                message: 'Successful Get WORKBook',
                count: items.length, 
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
    const workbookFields = {};

    if(req.body.title) workbookFields.title = req.body.title;
    if(req.body.desc) workbookFields.desc = req.body.desc;
    if(req.body.professor) workbookFields.professor = req.body.professor;
    if(req.body.poster) workbookFields.poster = req.body.poster;
    if(req.body.rating) workbookFields.rating = req.body.rating;
    if(req.body.backdrop) workbookFields.backdrop = req.body.backdrop;
    if(req.body.comment) workbookFields.comment = req.body.comment;
    if(req.body.like) workbookFields.like = req.body.like;
    if(req.body.url) workbookFields.url = req.body.url;   
    if(typeof req.body.genres_ids !== 'undefined'){
        workbookFields.genres_ids = req.body.genres_ids.split(',')
    } 

    const newWorkbook = new workbookModel(workbookFields);
    newWorkbook
        .save()
        .then(item => {
            res.status(200).json({
                message: 'Successful Workbook',
                results: item
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
})

router.get('/:workbookModelId', (req, res) => {
    workbookModel
        .findById(req.params.workbookModelId)
        .then(item => {
            res.status(200).json({
                message: 'Successful Get Workbook',
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
    workbookModel
        .findByIdAndUpdate(req.params.workbookModelId)
        .then()
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
})

router.delete('/:id', (req, res) => {
    workbookModel
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




module.exports = router;
