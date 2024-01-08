const express = require('express');
const router = express.Router();


router.get("/free", (req, res) => {});

router.get("/free/:id", (req, res) => {});

router.post("/free", (req, res) => {});

router.put("/free/:id", (req, res) => {});

router.delete("/free/:id", (req, res) => {});

router.get("/free/:id/comments", (req, res) => {});

router.post("/free/:id/comments", (req, res) => {});
router
// app.put("/free/:id/:cid", (req, res) => {});

router.delete("/free/:id/:cid", (req, res) => {});

module.exports = router;