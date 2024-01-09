const express = require("express");
const router = express.Router();

//app.get("/", (req, res) => {});

//router.get("/login", (req, res) => {});


app.post('/login', (req, res) => {
    if (req.session.user ? req.session.user.id == 'test' : false) {
        res.redirect('/');
    }
    else if(req.body.id == '' && req.body.pw == 'pw') {
        req.session.user = {
            id: req.body.id,
        };

        res.setHeader('Set-Cookie', ['user=' + req.body.id]);
        res.redirect('/');
    }
    else {
        res.redirect('/login');
    }
});






router.get("/logout", (req, res) => {});

module.exports = router;
