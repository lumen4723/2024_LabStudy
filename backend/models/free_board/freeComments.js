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
    } else if (!req.body.content || !req.params.id || !req.session.user.id) {
        res.send({ result: "invaild_value" });
    } else {
        const sql =
            "INSERT INTO freecomment (content, boardid, userid) VALUES(?, ?, ?)";
        const params = [req.body.content, req.params.id, req.session.user.id];

        connection.query(sql, params, (err, rows) => {
            if (err) throw err;
            res.send({ result: "freepost_success" });
        });
    }
});

router.get("/free/:id/comment", (req, res) => {
    const sql = "SELECT * FROM freecomment WHERE boardid = ?";
    const id = [req.params.id];
    // console.log(id);
    connection.query(sql, id, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

//const sql = "DELETE FROM freecomment WHERE boardid = ? AND id =?";

router.delete("/free/:id/:cid", (req, res) => {
    if (!req.session.user) {
        res.send({ result: "no_session" });
    } else {
        const sql =
            "SELECT * FROM freecomment WHERE boardid = ? AND userid = ?";
        const id = [req.params.id, req.session.user.id];
        connection.query(sql, id, (err, rows) => {
            if (rows.length == 0) {
                res.send({ result: "no_authority" });
            } else {
                const sql2 =
                    "DELETE FROM freecomment WHERE boardid = ? AND id = ?";
                const id2 = [req.params.id, req.params.cid];

                connection.query(sql2, id2, (err, rows) => {
                    if (err) throw err;
                    res.send({ result: "freedelete_success" });
                });
            }
        });
    }
});

module.exports = router;
