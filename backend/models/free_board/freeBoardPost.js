const express = require("express");
const router = express.Router();

router.post("/free", (req, res) => {
    const sql =
        "INSERT INTO freeboard (title, content, userid)" + "VALUES (?, ?, ?)";
    const params = [req.body.title, req.body.content, req.body.writer];

    connection.query(sql, params, (err, rows) => {
        if (err) throw err;
        res.send({ result: "success" });
    });
});

router.put("/free/:id", (req, res) => {});

router.delete("/free/:id", (req, res) => {});

module.exports = router;
