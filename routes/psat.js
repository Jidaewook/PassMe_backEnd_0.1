const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCheck = passport.authenticate('jwt', {session: false});

const psatModel = require('../model/psatModel');
const userModel = require('../model/userModel')

router.get('/', (req, res) => {
    psatModel
        .find()
        .sort({createdAt: -1})
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

// @Register Comment
router.post('/comment/:psatId', authCheck, (req, res) => {
    psatModel
        .findById(req.params.psatId)
        .then(psat => {
            const newComment = {
                name: req.user.name,
                avatar: req.user.avatar,
                user: req.user._id,
                text: req.body.text
            }
            psat.comment.unshift(newComment);
            psat.save().then(psat => res.json(psat));
        })
        .catch(err => {
            res.status(404).json({
                msg: err.message
            })
        })
})

// Delete Comment
router.delete('/comment/:psatId/:commentId', authCheck, (req, res) => {
    userModel
        .findById(req.user.id)
        .then(user => {
            psatModel
                .findById(req.params.psatId)
                .then(psat => {
                    if (psat.comment.filter(c => c.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({
                            msg: 'Not Authorization'
                        })
                    } else {
                        const removeIndex = psat.comment
                        .map(item => item._id.toString())
                        .indexOf(req.params.commentId)
        
                        psat.comment.splice(removeIndex, 1);
                        psat.save().then(psat => res.json(psat));
                    }
                    
            })
            .catch(err => {
                res.status(400).json({
                    msg: err.message
                })
            })
        })
        .catch(err => {
            res.status(404).json({
                msg: err.message
            })
        })
    
})

//  @Register Like
router.post('/likes/:psatId', authCheck, (req, res) => {
    
    userModel
        .findById(req.user.id)
        .then(user => {
            console.log('!!!!!!!!!!!!!!!!', user)
            psatModel
                .findById(req.params.psatId)
                .then(psat => {
                    console.log('++++++++', psat.likes.filter(l => l.user.toString() === user.id).length > 0)
                    if(psat.likes.filter(l => l.user.toString() === user.id).length > 0) {
                        return res.status(400).json({
                            msg: 'Already Liked this post'
                        })
                    }
                    // Add user id to likes array
                    psat.likes.unshift({ user: req.user.id });
                    psat.save().then(psat => res.json(psat));
                })
                .catch(err => {
                    res.status(400).json({
                        msg: `No PSAT By ${psatId}`
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
router.post('/unlikes/:psatId', authCheck, (req, res) => {
    userModel
        .findById(req.user.id)
        .then(user => {
            psatModel
                .findById(req.params.psatId)
                .then(psat => {
                    if(psat.likes.filter(l => l.user.toString() === user.id).length === 0){
                        return res.status(401).json({
                            msg: 'Not liked this post yet'
                        })
                    }
                    const removeIndex = psat.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id)

                    psat.likes.splice(removeIndex, 1)
                    psat.save().then(psat => res.json(psat))
            
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