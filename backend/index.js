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

app.get("/", (req, res) => {});

app.get("/login", (req, res) => {});

app.post("/login", (req, res) => {});

app.get("/logout", (req, res) => {});

app.post("/register", (req, res) => {});

app.get("/free", (req, res) => {});

app.get("/free/:id", (req, res) => {});

app.post("/free", (req, res) => {});

app.put("/free/:id", (req, res) => {});

app.delete("/free/:id", (req, res) => {});

app.get("/free/:id/comments", (req, res) => {});

app.post("/free/:id/comments", (req, res) => {});

// app.put("/free/:id/:cid", (req, res) => {});

app.delete("/free/:id/:cid", (req, res) => {});

app.get("/qna", (req, res) => {});

app.get("/qna/:id", (req, res) => {});

app.post("/qna", (req, res) => {});

app.put("/qna/:id", (req, res) => {});

app.delete("/qna/:id", (req, res) => {});

app.get("/qna/:id/question", (req, res) => {});

app.post("/qna/:id/question", (req, res) => {});

// app.put("/qna/:id/:qid", (req, res) => {});

// app.delete("/qna/:id/:qid", (req, res) => {});

app.get("/qna/:id/:qid/answer", (req, res) => {});

app.post("/qna/:id/:qid/answer", (req, res) => {});

// app.put("/qna/:id/:qid/:aid", (req, res) => {});

// app.delete("/qna/:id/:qid/:aid", (req, res) => {});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
