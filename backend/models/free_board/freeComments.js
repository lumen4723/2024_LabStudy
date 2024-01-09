const express = require('express');
const router = express.Router();

const path = require("path");
const mysql = require("mysql");
const mainModulePath = path.dirname(require.main.filename);
const dbconfig = require(path.resolve(mainModulePath, "../config/dbinfo.js"));
const connection = mysql.createConnection(dbconfig);



router.get("/free/:id/comments", (req, res) => {
    const sql = "SELECT * FROM freecomment WHERE boardid = ?";
    const id = [req.params.id];
    console.log(id);
    connection.query(sql, id, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

router.delete("/free/:id/:cid", (req, res) => {
    const sql = "DELETE FROM freecomment WHERE boardid = ? AND id =?";
    const id = [req.params.id, req.params.cid]
    
    connection.query(sql,id, (err, rows) =>{
        if(err) throw err;
        res.send(rows);
    }); 
});


router.delete("/free/:id/:cid", (req, res) => {});
module.exports = router;