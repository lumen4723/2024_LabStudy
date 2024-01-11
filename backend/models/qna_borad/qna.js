const express = require('express');
const router = express.Router();

const path = require("path");
const mysql = require("mysql");
const mainModulePath = path.dirname(require.main.filename);
const dbconfig = require(path.resolve(mainModulePath, "../config/dbinfo.js"));
const connection = mysql.createConnection(dbconfig);


router.get("/qna/:id/answer", (req, res) => {
    const sql = "SELECT * FROM qnacomment WHERE boardid = ?";
    const id = [req.params.id];

    connection.query(sql, id, (err, rows) => {
        return res.send(rows);
    });
});

router.post("/qna/:id/answer", (req, res) => {
    if (!req.session.user) {
        return res.send({ result: "no_session" });
    } else if (!req.body.comment || !req.params.id) {
        return res.send({ result: "invalid_value" });
    } else if (!req.session.user.id) {
        return res.send({ result: "invalid_session" });
    } else {
        const sql =
            "INSERT INTO qnacomment (answer, boardid, userid) VALUES (?, ?, ?)";
        const params = [req.body.comment, req.params.id, req.session.user.id];

        connection.query(sql, params, (err, rows) => {
            if (err) {
                switch (err.code) {
                    case "ER_DATA_TOO_LONG":
                        return res.send({ result: "data_too_long" });

                    default:
                        return res.send({ result: "qnapost_fail" });
                }
            }

            return res.send({ result: "qna_success" });
        });
    }
});


// router.put("/qna/:id/:qid/:aid", (req, res) => {});

// router.delete("/qna/:id/:qid/:aid", (req, res) => {});

module.exports = router;