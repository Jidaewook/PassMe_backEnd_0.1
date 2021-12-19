const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCheck = passport.authenticate('jwt', {session: false});

const bbsModel = require('../model/bbsModel');
const userModel = require('../model/userModel')


router.get('/', (req, res) => {
    bbsModel
        .find()
        .sort({createdAt: -1})
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
    if(req.body.thumb) bbsFields.thumb = req.body.thumb;
    if(req.body.like) bbsFields.like = req.body.like;
    if(req.body.comment) bbsFields.comment = req.body.comment;
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

// @Comment Register
router.post('/comment/:bbsId', authCheck, (req, res) => {
    bbsModel   
        .findById(req.params.bbsId)
        .then(bbs => {
            const newComment = {
                name: req.user.name,
                text: req.body.text,
                avatar: req.user.avatar,
                user: req.user._id
            }
            bbs.comment.unshift(newComment);
            bbs.save().then(bbs => req.json(bbs));
        })
        .catch(err => {
            res.status(404).json({
                msg: err.message
            })
        })
    })

// @Comment Delete
router.delete('/comment/:bbsId/:commentId', authCheck, (req, res) => {
    userModel
        .findById(req.user.id)
        .then(user => {
            bbsModel
                .findById(req.params.bbsId)
                .then(bbs => {
                    if (bbs.comment.fileter(c => c.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({
                            msg: 'Not Authorization'
                        })
                    }
                    const removeIndex = bbs.comment
                        .map(item => item._id.toString())
                        .indexOf(req.params.commentId);

                        bbs.comment.splice(removeIndex, 1);
                        bbs.save().then(bbs => res.json(bbs));
                })
                .catch(err => {
                    res.status(404).json({
                        msg: err.messsage
                    })
                })
        })
        .catch(err => {
            res.status(404).json({
                msg: err.message
            })
        })
})




module.exports = router;