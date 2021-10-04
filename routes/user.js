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

router.get('/userinfo', authCheck, (req, res) => {
    res.json(req.user)
});




module.exports = router;
