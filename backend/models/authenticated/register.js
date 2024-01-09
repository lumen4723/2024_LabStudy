const express = require("express");
const app = express();
const router = express.Router();

const path = require('path');
const mysql = require("mysql");
const mainModulePath = path.dirname(require.main.filename);
const dbconfig = require(path.resolve(mainModulePath, '../config/dbinfo.js'));
const connection = mysql.createConnection(dbconfig);

router.post("/register", (req, res) => {
    if (req.body.id && req.body.pw) {
        const sql = "INSERT INTO user (id, pw) VALUES (?, ?)";
        const params = [req.body.id, req.body.pw];

        connection.query(sql, params, (err, rows) => {
            if (err) throw err;
            res.redirect("/login");
        });
    } else {
        res.redirect("/register");
    }
});

module.exports = router;
