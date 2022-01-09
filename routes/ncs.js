
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCheck = passport.authenticate('jwt', {session: false});


const ncsModel = require('../model/ncsModel');
const userModel = require('../model/userModel')

router.get('/', (req, res) => {
    ncsModel
        .find()
        .sort({createdAt: -1})
        .then(items => {
            res.status(200).json({
                message: 'Successful Get NCS',
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
    const ncsFields = {};

    if(req.body.title) ncsFields.title = req.body.title;
    if(req.body.desc) ncsFields.desc = req.body.desc;
    if(req.body.professor) ncsFields.professor = req.body.professor;
    if(req.body.poster) ncsFields.poster = req.body.poster;
    if(req.body.rating) ncsFields.rating = req.body.rating;
    if(req.body.backdrop) ncsFields.backdrop = req.body.backdrop;
    if(req.body.comment) ncsFields.comment = req.body.comment;
    if(req.body.like) ncsFields.like = req.body.like;
    if(req.body.url) ncsFields.url = req.body.url;   
    if(typeof req.body.genres_ids !== 'undefined'){
        ncsFields.genres_ids = req.body.genres_ids.split(',')
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

router.put('/:id', (req, res) => {
    const ncsInputFields = {};
    if(req.body.title) ncsInputFields.title = req.body.title;
    if(req.body.desc) ncsInputFields.desc = req.body.desc;
    if(req.body.url) ncsInputFields.url = req.body.url;
    if(req.body.poster) ncsInputFields.poster = req.body.poster;
    if(req.body.backdrop) ncsInputFields.backdrop = req.body.backdrop;
    if(typeof req.body.genres_ids !== 'undefined'){
        ncsInputFields.genres_ids = req.body.genres_ids.split(',')
    } 



    ncsModel
        .findById(req.params.id)
        .then(ncs => {
            ncsModel
            .findOneAndUpdate(
                {_id: req.params.id},
                {$set: ncsInputFields},
                {new: true}
            )
            .then(ncs => {
                res.json(ncs)
            })
        })
        .catch(err => {
            res.status(404).json({
                msg: err.message
            })
        })
})

router.delete('/', (req, res) => {
    ncsModel
        .findByIdAndDelete(
            {_id: req.params.ncsModelId},
            {$set: {title, desc, genres_ids, rating, poster}}
        )
        .then(() => {
            res.status(200).json({
                message: 'Successful NCS Delete'
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            });
        });
});

// @Comment Register
router.post('/comment/:ncsId', authCheck, (req, res) => {
    ncsModel
        .findById(req.params.ncsId)
        .then(ncs => {
            const newComment = {
                name: req.user.name, 
                text: req.body.text,
                avatar: req.user.avatar,
                user: req.user._id
            }
            ncs.comment.unshift(newComment);
            ncs.save().then(ncs => res.json(ncs));
        })
        .catch(err => {
            res.status(404).json({
                msg: err.message
            })
        })
        
})

// @Delete Comment
router.delete('/comment/:ncsId/:commentId', authCheck, (req, res) => {
    userModel
        .findById(req.user.id)
        .then(user => {
            ncsModel
                .findById(req.params.ncsId)
                .then(ncs => {
                    if (ncs.comment.filter(c => c.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({
                            msg: 'Not Authorization'
                        })
                    }
                    const removeIndex = ncs.comment
                        .map(item => item._id.toString())
                        .indexOf(req.params.commentId);
                    
                    // splice comment out of array
                    ncs.comment.splice(removeIndex, 1);
                    ncs.save().then(ncs => res.json(ncs));
            })
            .catch(err => {
                res.status(404).json({
                    msg: err.message
                })
            })
        })
        .catch(err => {
            res.status(404).json({
                msg: err.message
            })
        })
    
    // userModel
    //     .findById(req.user.id)
    //     .then(user => {
    //         ncsModel
    //             .findById(req.params.ncsId)
    //             .then(ncs => {
    //                 if(ncs.comment.filter(c => c._id.toString() === req.params.commendId).length === 0){
    //                     return res.status(401).json({
    //                         msg: 'Not Comment this post yet'
    //                     })
    //                 }
    //                 const removeIndex = ncs.comment
    //                 .map(item => item._id.toString())
    //                 .indexOf(req.params.commentId)

    //                 ncs.comment.splice(removeIndex, 1)
    //                 ncs.save().then(ncs => res.json(ncs))
            
    //             })
    //             .catch(err => {
    //                 res.status(400).json({
    //                     msg: err.message
    //                 })
    //             })
    //     })
    //     .catch(err => {
    //         res.status(404).json({
    //             msg: err.message
    //         })
    //     })
})

//  @Register Like
router.post('/likes/:ncsId', authCheck, (req, res) => {
    
    userModel
        .findById(req.user.id)
        .then(user => {
            console.log('!!!!!!!!!!!!!!!!', user)
            ncsModel
                .findById(req.params.ncsId)
                .then(ncs => {
                    console.log('++++++++', ncs.likes.filter(l => l.user.toString() === user.id).length > 0)
                    if(ncs.likes.filter(l => l.user.toString() === user.id).length > 0) {
                        return res.status(400).json({
                            msg: 'Already Liked this post'
                        })
                    }
                    // Add user id to likes array
                    ncs.likes.unshift({ user: req.user.id });
                    ncs.save().then(ncs => res.json(ncs));
                })
                .catch(err => {
                    res.status(400).json({
                        msg: `No NCS By ${ncsId}`
                    })
                })
        })
        .catch(err => {
            res.status(404).json({
                msg: err.message
            })
        })
})


// @Delete Like
router.post('/unlikes/:ncsId', authCheck, (req, res) => {
    userModel
        .findById(req.user.id)
        .then(user => {
            ncsModel
                .findById(req.params.ncsId)
                .then(ncs => {
                    if(ncs.likes.filter(l => l.user.toString() === user.id).length === 0){
                        return res.status(401).json({
                            msg: 'Not liked this post yet'
                        })
                    }
                    const removeIndex = ncs.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id)

                    ncs.likes.splice(removeIndex, 1)
                    ncs.save().then(ncs => res.json(ncs))
            
                })
                .catch(err => {
                    res.status(400).json({
                        msg: 'No Post'
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
