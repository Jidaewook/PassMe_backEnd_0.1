
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        msg: "NCS"  
    })
    
})

router.post('/', (req, res) => {
    res.json({
        msg: 'NCS POST'
    })
})

router.get('/:ncsModelId', (req, res) => {
    res.json({
        msg: 'NCS DetailGet'
    })
})

router.patch('/', (req, res) => {
    res.json({
        msg: 'NCS Update'
    })
})

router.delete('/', (req, res) => {
    res.json({
        msg: 'NCS Delete'
    })
})




module.exports = router;
