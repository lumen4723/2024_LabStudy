const express = require("express");
const app = express();
const router = express.Router();

//app.get("/", (req, res) => {});

//router.get("/login", (req, res) => {});

const path = require('path');
const mysql = require("mysql");
const mainModulePath = path.dirname(require.main.filename);
const dbconfig = require(path.resolve(mainModulePath, '../config/dbinfo.js'));
const connection = mysql.createConnection(dbconfig);

app.post("/login", (req, res) => {
    if (req.session.user) {
        // already logged in
        const sql = "SELECT * FROM user WHERE id = ? AND pw = ?";
        const params = [req.session.user.id, req.session.user.pw];

        connection.query(sql, params, (err, rows) => {
            if (err) throw err;

            // session user 정보가 디비에 없으면 로그인 페이지로 이동
            if (rows.length == 0) {
                res.redirect("/login");
            } else {
                // session user 정보가 디비에 있으면 메인 페이지로 이동
                req.session.user = {
                    id: req.session.user.id,
                    pw: req.session.user.pw,
                };

                res.setHeader("Set-Cookie", ["user=" + req.session.user.id]);
                res.redirect("/");
            }
        });

        res.redirect("/");
    } else if (req.body.id && req.body.pw) {
        const sql = "SELECT * FROM user WHERE id = ? AND pw = ?";
        const params = [req.body.id, req.body.pw];

        connection.query(sql, params, (err, rows) => {
            if (err) throw err;

            // request body에 user 정보가 디비에 없으면 로그인 페이지로 이동
            if (rows.length == 0) {
                res.redirect("/login");
            } else {
                // request body에 user 정보가 디비에 있으면 메인 페이지로 이동
                req.session.user = {
                    id: req.body.id,
                    pw: req.body.pw,
                };

                res.setHeader("Set-Cookie", ["user=" + req.body.id]);
                res.redirect("/");
            }
        });
    } else {
        res.redirect("/login");
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.clearCookie("user");
    res.redirect("/");
});

module.exports = router;
