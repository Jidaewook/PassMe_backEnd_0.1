const express = require('express');
const router = express.Router();

const bctypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// register
// @route POST users/register
// @desc register
// @access public 

router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

// check validation
    if(!isValid) {
        return res.status(400).json(erros);
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if(user) {
                return res.status(404).json({
                    error: 'Email already exists'
                });
            }
            const newUser = new userModel({
                name: req.body.name,
                email: req.body.email, 
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                            .then(user => {
                                res.json(user)
                            })
                            .catch(err => {
                                res.json(err)
                            });
                })
            
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
    const { errors, isValid} = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(erros);
    }

    const email = req.body.email;
    const password = req.body.password;

    userModel
        .findOne({email})
        .then(user => {
            if(!user) {
                return res.status(404).json({
                    error: 'user not found'
                });
            }
            bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //User Matched
                        const payload = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            avatar: user.avatar
                        };

                        //Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            }
                        );
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);

                    }
                })
                .catch(err => res.json(err));


            // user.comparePassword(password, (err, isMatch) => {
            //     if (err || isMatch === false) {
            //         return res.status(400).json({
            //             err: "wrong password"
            //         });
            //     }
            //     const payload = { id: user._id, name: user.name, email: user.email, avatar: user.avatar};

            //     res.status(200).json({
            //         success: isMatch,
            //         token: tokenGenerator(payload)
            //     });
                
            // })
        });
});

router.get('/', (req, res) => {
    res.json({
        msg: 'DELETE PSAT'
    })
});

module.exports = router;
