const express = require('express');
const router = express.Router();

const userModel = require('../model/userModel');

const bctypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register
// @route POST users/register
// @desc register
// @access public 

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    
    userModel
        .findOne({email})
        .then(user => {
            if(user) {
                return res.status(404).json({
                    error: 'Email already exists'
                });
            }
            const newUser = new userModel({
                name, email, password
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
                const payload = { id: user._id, name: user.name, email: user.email, avatar: user.avatar};

                res.status(200).json({
                    success: isMatch,
                    token: tokenGenerator(payload)
                });
                
            })
        });
});

router.get('/', (req, res) => {
    res.json({
        msg: 'DELETE PSAT'
    })
});

module.exports = router;
