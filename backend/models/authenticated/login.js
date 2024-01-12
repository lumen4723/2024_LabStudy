const express = require("express");
const router = express.Router();

const path = require("path");
const mysql = require("mysql");
const mainModulePath = path.dirname(require.main.filename);
const dbconfig = require(path.resolve(mainModulePath, "../config/dbinfo.js"));
const connection = mysql.createConnection(dbconfig);

router.post("/login", (req, res) => {
    if (req.session.user) {
        const sql = "SELECT * FROM user WHERE id = ? AND pw = ?";
        const params = [req.session.user.id, req.session.user.pw];

        connection.query(sql, params, (err, rows) => {
            if (!rows || rows.length == 0) {
                return res.send({ result: "invaild_session" });
            } else {
                req.session.user = {
                    id: req.session.user.id,
                    pw: req.session.user.pw,
                };

                return res.send({
                    result: "already_login",
                    name: rows[0].username,
                });
            }
        });
    } else if (req.body.id && req.body.pw) {
        const sql = "SELECT * FROM user WHERE id = ? AND pw = ?";
        const params = [req.body.id, req.body.pw];

        connection.query(sql, params, (err, rows) => {
            if (!rows || rows.length == 0) {
                return res.send({ result: "no_user" });
            } else {
                req.session.user = {
                    id: req.body.id,
                    pw: req.body.pw,
                };

                return res.send({
                    result: "login_success",
                    name: rows[0].username,
                });
            }
        });
    } else {
        return res.send({ result: "invaild_value" });
    }
});

router.delete("/logout", (req, res) => {
    req.session.destroy();
    res.clearCookie("name");
    return res.sendStatus(200);
});

router.post("/vaildlogin", (req, res) => {
    if (req.session.user) {
        const sql = "SELECT * FROM user WHERE id = ? AND pw = ?";
        const params = [req.session.user.id, req.session.user.pw];

        connection.query(sql, params, (err, rows) => {
            if (!rows || rows.length == 0) {
                return res.send({ result: "invaild_session" });
            } else {
                return res.send({ result: "already_login" });
            }
        });
    } else {
        return res.send({ result: "invaild_value" });
    }
});

module.exports = router;
