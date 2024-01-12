const express = require("express");
const router = express.Router();

const path = require("path");
const mysql = require("mysql");
const mainModulePath = path.dirname(require.main.filename);
const dbconfig = require(path.resolve(mainModulePath, "../config/dbinfo.js"));
const connection = mysql.createConnection(dbconfig);

router.get("/free", (req, res) => {
    const sql = "SELECT * FROM freeboard ORDER BY ID DESC;";

    connection.query(sql, (err, rows) => {
        return res.send(rows);
    });
});

router.get("/free/:id", (req, res) => {
    const sql = "SELECT * FROM freeboard WHERE id = ?";
    const viewCountSQL = "UPDATE freeboard SET view = view + 1 WHERE id = ?";

    const id = [req.params.id];

    connection.query(sql, id, (err, rows) => {
        connection.query(viewCountSQL, id, (err) => {
            return res.send(rows);
        });
    });
});

module.exports = router;
