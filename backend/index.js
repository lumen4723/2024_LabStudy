const express = require("express");
const app = express();
const port = 8088;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const path = require("path");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        //secret은 임의의 난수값
        secret: "g7$In!2@S#%9Oc$5mB",
        resave: true,
        saveUninitialized: true,
    })
);

// 로그인 기능
const loginRouter = require('./models/login.js');
app.use('/', loginRouter);


//자유 개시판
const freeRouter = require('./models/free.js');
app.use('/', freeRouter);


//질문 개시판
const qnaRouter = require('./models/qna.js');
app.use('/', qnaRouter);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
