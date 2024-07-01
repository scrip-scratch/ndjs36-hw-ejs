const express = require("express");
const router = express.Router();
const store = require("../store/library");

router.get("/", (req, res) => {
  const { library } = store;
  res.render("index", {
    title: "МояБиблиотека",
    books: library,
  });
});

module.exports = router;
