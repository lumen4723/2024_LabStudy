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
        return;
    } else if (!req.body.title || !req.body.content) {
        res.send({ result: "invaild_value" });
        return;
    }

    const sql =
        "INSERT INTO freeboard (title, content, userid) VALUES (?, ?, ?)";
    const params = [req.body.title, req.body.content, req.session.user.id];

    connection.query(sql, params, (err, rows) => {
        if (err) {
            switch (err.code) {
                case "ER_DATA_TOO_LONG":
                    res.send({ result: "data_too_long" });
                    return;
                default:
                    res.send({ result: "freepost_fail" });
                    return;
            }
        }
        res.send({ result: "freepost_success" });
    });
});

router.put("/free/:id", (req, res) => {
    if (!req.session.user) {
        res.send({ result: "no_session" });
        return;
    } else if (!req.body.content) {
        res.send({ result: "invaild_value" });
        return;
    }
    const sql = "SELECT * FROM freeboard WHERE id = ? AND userid = ?";
    const params = [req.params.id, req.session.user.id];

    connection.query(sql, params, (err, rows) => {
        if (rows.length == 0) {
            res.send({ result: "no_authority" });
            return;
        }
    });

    const sql2 = "UPDATE freeboard SET content = ? WHERE id = ?";
    const params2 = [req.body.content, req.params.id];

    connection.query(sql2, params2, (err, rows) => {
        if (err) {
            switch (err.code) {
                case "ER_DATA_TOO_LONG":
                    res.send({ result: "data_too_long" });
                    return;
                default:
                    res.send({ result: "freeput_fail" });
                    return;
            }
        }

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
        if (rows.length == 0) {
            res.send({ result: "no_authority" });
            return;
        }
    });

    const sql2 = "DELETE FROM freeboard WHERE id = ?";
    const params2 = [req.params.id];

    connection.query(sql2, params2, (err, rows) => {
        if (err) {
            res.send({ result: "freedel_fail" });
            return;
        }
        res.send({ result: "freedel_success" });
    });
});

module.exports = router;
