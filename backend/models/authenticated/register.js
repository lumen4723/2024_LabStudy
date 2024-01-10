const express = require("express");
const app = express();
const router = express.Router();

const path = require("path");
const mysql = require("mysql");
const mainModulePath = path.dirname(require.main.filename);
const dbconfig = require(path.resolve(mainModulePath, "../config/dbinfo.js"));
const connection = mysql.createConnection(dbconfig);

router.post("/register", (req, res) => {
    if (req.body.id && req.body.username && req.body.pw) {
        const sql = "INSERT INTO user (id, username, pw) VALUES (?, ?, ?)";
        const params = [req.body.id, req.body.username, req.body.pw];

        connection.query(sql, params, (err, rows) => {
            if (err) {
                switch (err.code) {
                    case "ER_DUP_ENTRY":
                        res.send({ result: "already_exist" });
                        return;
                    case "ER_DATA_TOO_LONG":
                        res.send({ result: "data_too_long" });
                        return;
                    default:
                        res.send({ result: "register_fail" });
                        return;
                }
            }

            res.send({ result: "register_success" });
        });
    } else {
        res.send({ result: "invaild_value" });
    }
});

module.exports = router;
