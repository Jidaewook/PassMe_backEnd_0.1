require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('./config/database');

const ncsRouter = require('./routes/ncs');
const psatRouter = require('./routes/psat');
const userRouter = require('./routes/user');

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
app.use("/psat", psatRouter);
app.use("/users", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('SERVER STARTED'));

