require('dotenv').config();
const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.json({
        msg: "PassMe Backend"
    })
})




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('SERVER STARTED'));

