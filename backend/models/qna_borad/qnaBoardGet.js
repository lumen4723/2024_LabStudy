const express = require('express');
const router = express.Router();

const path = require("path");
const mysql = require("mysql");
const mainModulePath = path.dirname(require.main.filename);
const dbconfig = require(path.resolve(mainModulePath, "../config/dbinfo.js"));
const connection = mysql.createConnection(dbconfig);

router.get("/qna", (req, res) => {
    const sql = "SELECT * FROM qnaboard";

    connection.query(sql, (err, rows) => {
        return res.send(rows);
    });
});

router.get("/qna/:id", (req, res) => {
    const sql = "SELECT * FROM qnaboard WHERE id = ?";
    const id = [req.params.id];

    connection.query(sql, id, (err, rows) => {
        return res.send(rows);
    });
});

module.exports = router;