const express = require("express");
const router = express.Router();

const path = require("path");
const mysql = require("mysql");
const mainModulePath = path.dirname(require.main.filename);
const dbconfig = require(path.resolve(mainModulePath, "../config/dbinfo.js"));
const connection = mysql.createConnection(dbconfig);

router.post("/free/:id/comment", (req, res) => {
    if (!req.session.user) {
        res.send({ result: "no_session" });
        return;
    } else if (!req.body.content || !req.params.id) {
        res.send({ result: "invaild_value" });
        return;
    } else if (!req.session.user.id) {
        res.send({ result: "invaild_session" });
        return;
    }

    const sql =
        "INSERT INTO freecomment (content, boardid, userid) VALUES(?, ?, ?)";
    const params = [req.body.content, req.params.id, req.session.user.id];

    connection.query(sql, params, (err, rows) => {
        if (err) {
            switch (err.code) {
                case "ER_DATA_TOO_LONG":
                    res.send({ result: "data_too_long" });
                    return;
                default:
                    res.send({ result: "fcompost_fail" });
                    return;
            }
        }

        res.send({ result: "fcompost_success" });
    });
});

router.get("/free/:id/comment", (req, res) => {
    const sql = "SELECT * FROM freecomment WHERE boardid = ?";
    const id = [req.params.id];

    connection.query(sql, id, (err, rows) => {
        res.send(rows);
    });
});

//const sql = "DELETE FROM freecomment WHERE boardid = ? AND id =?";

router.delete("/free/:id/:cid", (req, res) => {
    if (!req.session.user) {
        res.send({ result: "no_session" });
        return;
    }

    const sql = "SELECT * FROM freecomment WHERE boardid = ? AND userid = ?";
    const id = [req.params.id, req.session.user.id];

    connection.query(sql, id, (err, rows) => {
        if (rows.length == 0) {
            res.send({ result: "no_authority" });
            return;
        }
    });

    const sql2 = "DELETE FROM freecomment WHERE boardid = ? AND id = ?";
    const id2 = [req.params.id, req.params.cid];

    connection.query(sql2, id2, (err, rows) => {
        if (err) {
            res.send({ result: "fcomdel_fail" });
            return;
        }
        res.send({ result: "fcomdel_success" });
    });
});

module.exports = router;
