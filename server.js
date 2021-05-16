require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const ncsRouter = require('./routes/ncs');

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({
        msg: "PassMe Backend"
    })
})

// Router
app.use("/ncs", ncsRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('SERVER STARTED'));

