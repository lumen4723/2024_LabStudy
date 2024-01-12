const express = require("express");
const router = express.Router();

const path = require("path");
const mysql = require("mysql");
const mainModulePath = path.dirname(require.main.filename);
const dbconfig = require(path.resolve(mainModulePath, "../config/dbinfo.js"));
const connection = mysql.createConnection(dbconfig);

router.post("/free", (req, res) => {
    if (!req.session.user) {
        return res.send({ result: "no_session" });
    } else if (!req.body.title || !req.body.content) {
        return res.send({ result: "invaild_value" });
    } else {
        const sql =
            "INSERT INTO freeboard (title, content, userid) VALUES (?, ?, ?)";
        const params = [req.body.title, req.body.content, req.session.user.id];

        connection.query(sql, params, (err, rows) => {
            if (err) {
                switch (err.code) {
                    case "ER_DATA_TOO_LONG":
                        return res.send({ result: "data_too_long" });

                    default:
                        return res.send({ result: "freepost_fail" });
                }
            } else {
                return res.send({ result: "freepost_success" });
            }
        });
    }
});

router.post("/free/:id", (req, res) => {
    if (req.session.user) {
        const sql = "SELECT * FROM freeboard WHERE id = ? AND userid = ?";
        const params = [req.params.id, req.session.user.id];

        connection.query(sql, params, (err, rows) => {
            if (!rows || rows.length == 0) {
                return res.send({ result: "no_authority" });
            } else {
                return res.send({ result: "edit_vaild" });
            }
        });
    } else {
        return res.send({ result: "no_session" });
    }
});

router.put("/free/:id", (req, res) => {
    if (!req.session.user) {
        return res.send({ result: "no_session" });
    } else if (!req.body.content) {
        return res.send({ result: "invaild_value" });
    } else {
        const sql = "SELECT * FROM freeboard WHERE id = ? AND userid = ?";
        const params = [req.params.id, req.session.user.id];

        connection.query(sql, params, (err, rows) => {
            if (!rows || rows.length == 0) {
                return res.send({ result: "no_authority" });
            } else {
                const sql2 = "UPDATE freeboard SET content = ? WHERE id = ?";
                const params2 = [req.body.content, req.params.id];

                connection.query(sql2, params2, (err, rows) => {
                    if (err) {
                        switch (err.code) {
                            case "ER_DATA_TOO_LONG":
                                return res.send({ result: "data_too_long" });

                            default:
                                return res.send({ result: "freeput_fail" });
                        }
                    } else {
                        return res.send({ result: "freeput_success" });
                    }
                });
            }
        });
    }
});

router.delete("/free/:id", (req, res) => {
    if (!req.session.user) {
        return res.send({ result: "no_session" });
    } else {
        const sql = "SELECT * FROM freeboard WHERE id = ? AND userid = ?";
        const params = [req.params.id, req.session.user.id];

        connection.query(sql, params, (err, rows) => {
            if (!rows || rows.length == 0) {
                return res.send({ result: "no_authority" });
            } else {
                const sql2 = "DELETE FROM freeboard WHERE id = ?";
                const params2 = [req.params.id];

                connection.query(sql2, params2, (err, rows) => {
                    if (err) {
                        return res.send({ result: "freedel_fail" });
                    } else {
                        return res.send({ result: "freedel_success" });
                    }
                });
            }
        });
    }
});

module.exports = router;
