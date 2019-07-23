/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();

const controller = require("./controllers");
const {
  validUserBody,
  validUserAuthed,
  validUserLogin,
  validUserBodyWithIcrypt,
  validUserLoginWithIcrypt
} = require("./middleware");

router.get("/users", validUserAuthed, async (req, res, next) => {
  try {
    const users = await controller.getUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/users/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(err => {
      if(err) {
        res.send('Logout unsuccessful');
      } else {
        res.send('Logout successful');
      }
    });
  } else {
    res.end();
  }
})

router.post(
  "/users/register",
  validUserBody,
  async (req, res, next) => {
    try {
      const createdUser = await controller.postUser(req.newUser);
      // eslint-disable-next-line require-atomic-updates
      // req.session.user = createdUser;
      res.status(201).json(createdUser);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/users/login",
  validUserLogin,
  async (req, res, next) => {
    try {
      res.status(200).json(req.session.user);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
