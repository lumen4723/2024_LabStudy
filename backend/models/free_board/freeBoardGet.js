const express = require('express');
const router = express.Router();

const path = require("path");
const mysql = require("mysql");
const dbconfig = require(path.resolve(__dirname, '../config/dbinfo.js'));
const connection = mysql.createConnection(dbconfig);


router.get("/free", (req, res) => {
    const sql = "SELECT * FROM freeboard";
    connection.query(sql,(err, rows) =>{
        if(err) throw err;
        
        res.send(rows);
    }); 
});

router.get("/free/:id", (req, res) => {
    const sql = "SELECT * FROM freeboard WHERE id = ?";
    const id = [req.body.id];

    connection.query(sql, id, (err, rows) => {
        if(err) throw err;
        res.json(rows);
    });
});

module.exports = router;