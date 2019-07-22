const express = require("express");
const router = express.Router();

const controller = require("./controllers");
const { validCreateUser } = require("./middleware");

router.get("/users", async (req, res, next) => {
  try {
    res.status(200).json({ message: "success" });
  } catch (err) {
    next(err);
  }
});

router.post("/users/login", validCreateUser, async (req, res, next) => {
  try {
    const createdUser = await controller.postUser(req.newUser);
    res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
