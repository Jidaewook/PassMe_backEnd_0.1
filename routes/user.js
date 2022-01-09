const express = require('express');
const router = express.Router();

const passport = require('passport');
const authCheck = passport.authenticate('jwt', {session: false});

const userModel = require('../model/userModel');

const bctypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register
// @route POST users/register
// @desc register
// @access public 

router.post('/register', (req, res) => {
    const { name, email, password, institue, area, introduce } = req.body;
    
    userModel
        .findOne({email})
        .then(user => {
            if(user) {
                return res.status(404).json({
                    error: 'Email already exists'
                });
            }
            const newUser = new userModel({
                name, email, password, institue, area, introduce
            })
            newUser.save().then(user => {
                res.json(user)
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log(req.body);
    userModel
        .findOne({email})
        .then(user => {
            if(!user) {
                return res.status(404).json({
                    error: 'user not found'
                });
            }
            user.comparePassword(password, (err, isMatch) => {
                if (err || isMatch === false) {
                    return res.status(400).json({
                        err: "wrong password"
                    });
                }
                const payload = { 
                    id: user._id, 
                    name: user.name, 
                    email: user.email, 
                    avatar: user.avatar, 
                    institue: user.institue, 
                    area: user.area,
                    introduce: user.introduce
                };

                const token = jwt.sign(
                    payload,
                    "psatdoctor",
                    {expiresIn : '1d'}
                )


                res.status(200).json({
                    success: isMatch,
                    token
                });
                
            })
        });
});

router.put('/:id', (req, res) => {
    const userInputFields = {};
    if(req.body.name) userInputFields.name = req.body.name;
    if(req.body.institue) userInputFields.institue = req.body.institue;
    if(req.body.introduce) userInputFields.introduce = req.body.introduce;
    if(req.body.area) userInputFields.area = req.body.area;
    if(req.body.role) userInputFields.role = req.body.role;

    userModel   
        .findById(req.params.id)
        .then(user => {
            userModel
            .findOneAndUpdate(
                {_id: req.params.id},
                {$set: userInputFields},
                {new: true}
            ) 
            .then(user => {
                res.json(user)
            })
            
        })
        .catch(err => {
            res.status(404).json({
                msg: err.message
            })
        })
})



router.get('/userinfo', authCheck, (req, res) => {
    res.json(req.user)
});

router.get('/', (req, res) => {
    userModel
        .find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        })
})

router.get('/:id', (req, res) => {
    userModel
        .findById(req.params.id)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        })
})

router.delete('/:id', authCheck, (req, res) => {
    userModel
        .findByIdAndDelete(
            {_id: req.params.userModelId},
            // {$set: {email, password, avatar, role, institue, introduce, area}}
        )
        .then(() => {
            res.status(200).json({
                message: 'Succeful USER Delete'
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
})



module.exports = router;
