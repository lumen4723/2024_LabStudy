const express = require("express");
const router = express.Router();

const path = require("path");
const mysql = require("mysql");
const mainModulePath = path.dirname(require.main.filename);
const dbconfig = require(path.resolve(mainModulePath, "../config/dbinfo.js"));
const connection = mysql.createConnection(dbconfig);

router.post("/qna", (req, res) => {
    if (!req.session.user) {
        return res.send({ result: "no_session" });
    } else if (!req.body.title || !req.body.question) {
        return res.send({ result: "invaild_value" });
    } else {
        const sql =
            "INSERT INTO qnaboard (title, question, userid) VALUES (?, ?, ?)";
        const params = [req.body.title, req.body.question, req.session.user.id];

        connection.query(sql, params, (err, rows) => {
            if (err) {
                switch (err.code) {
                    case "ER_DATA_TOO_LONG":
                        return res.send({ result: "data_too_long" });

                    default:
                        return res.send({ result: "qnapost_fail" });
                }
            } else {
                return res.send({ result: "qna_success" });
            }
        });
    }
});

router.put("/qna/:id", (req, res) => {
    if (!req.session.user) {
        return res.send({ result: "no_session" });
    } else if (!req.body.content) {
        return res.send({ result: "invaild_value" });
    } else {
        const sql = "SELECT * FROM qnaBoard WHERE id = ? AND userid = ?";
        const params = [req.params.id, req.session.user.id];

        connection.query(sql, params, (err, rows) => {
            if (!rows || rows.length == 0) {
                return res.send({ result: "no_authority" });
            } else {
                const sql2 = "UPDATE qnaBoard SET question = ? WHERE id = ?";
                const params2 = [req.body.question, req.params.id];

                connection.query(sql2, params2, (err, rows) => {
                    if (err) {
                        switch (err.code) {
                            case "ER_DATA_TOO_LONG":
                                return res.send({ result: "data_too_long" });

                            default:
                                return res.send({ result: "qnaedit_fail" });
                        }
                    } else {
                        return res.send({ result: "qnaedit_success" });
                    }
                });
            }
        });
    }
});

router.delete("/qna/:id", (req, res) => {
    if (!req.session.user) {
        return res.send({ result: "no_session" });
    } else {
        const sql = "SELECT * FROM qnaBoard WHERE id = ? AND userid = ?";
        const params = [req.params.id, req.session.user.id];

        connection.query(sql, params, (err, rows) => {
            if (!rows || rows.length == 0) {
                return res.send({ result: "no_authority" });
            } else {
                const sql2 = "DELETE FROM qnaBoard WHERE id = ?";
                const params2 = [req.params.id];

                connection.query(sql2, params2, (err, rows) => {
                    if (err) {
                        return res.send({ result: "qnadelete_fail" });
                    } else {
                        return res.send({ result: "qnadelete_success" });
                    }
                });
            }
        });
    }
});

module.exports = router;
