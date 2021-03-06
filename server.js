require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('./config/database');

const protect = require('./config/passport');

const ncsRouter = require('./routes/ncs');
const psatRouter = require('./routes/psat');
const userRouter = require('./routes/user');
const noticeRouter = require('./routes/notice');
const bbsRouter = require('./routes/bbs');
const alarmRouter = require('./routes/alarm');
const workbookRouter = require('./routes/workbook');


// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize())

protect(passport)


app.get("/", (req, res) => {
    res.json({
        msg: "PassMe Backend"
    })
})

// Router
app.use("/ncs", ncsRouter);
app.use("/psat", psatRouter);
app.use("/users", userRouter);
app.use("/notice", noticeRouter);
app.use("/bbs", bbsRouter);
app.use("/alarm", alarmRouter);
app.use("/workbook", workbookRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('SERVER STARTED'));

