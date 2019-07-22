const express = require("express");
const router = express.Router();

const controller = require("./controllers");
const { validCreateUser, validUserAuthed } = require("./middleware");

router.get("/users", validUserAuthed, async (req, res, next) => {
  try {
    const users = await controller.getUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/users/register", validCreateUser, async (req, res, next) => {
  try {
    const createdUser = await controller.postUser(req.newUser);
    res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
