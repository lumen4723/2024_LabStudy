const express = require("express");
const router = express.Router();

const path = require("path");
const mysql = require("mysql");
const mainModulePath = path.dirname(require.main.filename);
const dbconfig = require(path.resolve(mainModulePath, "../config/dbinfo.js"));
const connection = mysql.createConnection(dbconfig);

router.get("/free", (req, res) => {
    const sql = "SELECT * FROM freeboard";

    connection.query(sql, (err, rows) => {
        res.send(rows);
    });
});

router.get("/free/:id", (req, res) => {
    const sql = "SELECT * FROM freeboard WHERE id = ?";
    const id = [req.params.id];

    connection.query(sql, id, (err, rows) => {
        res.send(rows);
    });
});

module.exports = router;
