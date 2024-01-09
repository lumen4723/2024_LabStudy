const express = require("express");
const router = express.Router();

const path = require("path");
const mysql = require("mysql");
const mainModulePath = path.dirname(require.main.filename);
const dbconfig = require(path.resolve(mainModulePath, "../config/dbinfo.js"));
const connection = mysql.createConnection(dbconfig);

router.post("/free", (req, res) => {
    if (!req.session.user) {
        res.send({ result: "no_session" });
    } else if (!req.body.title || !req.body.content) {
        res.send({ result: "invaild_value" });
    }

    const sql =
        "INSERT INTO freeboard (title, content, userid) VALUES (?, ?, ?)";
    const params = [req.body.title, req.body.content, req.session.user.id];

    connection.query(sql, params, (err, rows) => {
        if (err) throw err;
        res.send({ result: "freepost_success" });
    });
});

router.put("/free/:id", (req, res) => {
    if (!req.session.user) {
        res.send({ result: "no_session" });
    } else if (!req.body.content) {
        res.send({ result: "invaild_value" });
    }

    // session.user.id와 freeboard.userid가 다르면 수정 불가
    const sql = "SELECT * FROM freeboard WHERE id = ? AND userid = ?";
    const params = [req.params.id, req.session.user.id];

    connection.query(sql, params, (err, rows) => {
        if (err) throw err;

        if (rows.length == 0) {
            res.send({ result: "no_authority" });
        }
    });

    const sql2 = "UPDATE freeboard SET content = ? WHERE id = ?";
    const params2 = [req.body.content, req.params.id];

    connection.query(sql2, params2, (err, rows) => {
        if (err) throw err;
        res.send({ result: "freeput_success" });
    });
});

router.delete("/free/:id", (req, res) => {
    if (!req.session.user) {
        res.send({ result: "no_session" });
    }

    // session.user.id와 freeboard.userid가 다르면 삭제 불가
    const sql = "SELECT * FROM freeboard WHERE id = ? AND userid = ?";
    const params = [req.params.id, req.session.user.id];

    connection.query(sql, params, (err, rows) => {
        if (err) throw err;
        if (rows.length == 0) {
            res.send({ result: "no_authority" });
        }
    });

    // 댓글 삭제
    const sql2 = "DELETE FROM freeboard WHERE id = ?";
    const params2 = [req.params.id];

    connection.query(sql2, params2, (err, rows) => {
        if (err) throw err;
        res.send({ result: "freedelete_success" });
    });
});

module.exports = router;
