const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
    if (req.body.id && req.body.pw) {
        const sql = "INSERT INTO user (id, pw) VALUES (?, ?)";
        const params = [req.body.id, req.body.pw];

        connection.query(sql, params, (err, rows) => {
            if (err) throw err;
            res.redirect("/login");
        });
    } else {
        res.redirect("/register");
    }
});

module.exports = router;
