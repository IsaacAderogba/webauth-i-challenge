/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();

const controller = require("./controllers");
const {
  validUserBody,
  validUserAuthed,
  validUserLogin,
  validUserBodyWithIcrypt,
  validUserAuthedWithIcrypt,
  validUserLoginWithIcrypt
} = require("./middleware");

router.get("/users", validUserAuthedWithIcrypt, async (req, res, next) => {
  try {
    const users = await controller.getUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/users/register",
  validUserBodyWithIcrypt,
  async (req, res, next) => {
    try {
      const createdUser = await controller.postUser(req.newUser);
      res.status(201).json(createdUser);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/users/login",
  validUserLoginWithIcrypt,
  async (req, res, next) => {
    try {
      res.status(200).json({ message: "success" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
