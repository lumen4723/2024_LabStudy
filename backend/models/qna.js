const express = require('express');
const router = express.Router();

router.get("/qna", (req, res) => {});

router.get("/qna/:id", (req, res) => {});

router.post("/qna", (req, res) => {});

router.put("/qna/:id", (req, res) => {});

router.delete("/qna/:id", (req, res) => {});

router.get("/qna/:id/question", (req, res) => {});

router.post("/qna/:id/question", (req, res) => {});

// router.put("/qna/:id/:qid", (req, res) => {});

// router.delete("/qna/:id/:qid", (req, res) => {});

router.get("/qna/:id/:qid/answer", (req, res) => {});

router.post("/qna/:id/:qid/answer", (req, res) => {});

// router.put("/qna/:id/:qid/:aid", (req, res) => {});

// router.delete("/qna/:id/:qid/:aid", (req, res) => {});

module.exports = router;