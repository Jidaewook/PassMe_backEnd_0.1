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
            const payload = { name, email, password };
            const token = jwt.sign(
                payload, 
                process.env.JWT_ACCOUNT_ACTIVATION,
                {expiresIn: '20m'}
            ) 

            const emailData = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'PASSME NCS Account Activation Link',
                html: `
                <h1>Please use the following to activate your account</h1>
                <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                <hr />
                <p>This email may containe sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
            };
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
