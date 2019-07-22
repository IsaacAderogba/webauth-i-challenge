const bcrypt = require("bcryptjs");
const controller = require("./controllers");
const icrypt = require("./icrypt");

module.exports = {
  validUserBody: async function(req, res, next) {
    let { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields username or password" });
    }

    password = bcrypt.hashSync(password, 12);
    req.newUser = { username, password };
    next();
  },
  validUserAuthed: async function(req, res, next) {
    const { username, password } = req.headers;

    if (!username || !password) {
      return res
        .status(401)
        .json({ message: "Missing username or password in header" });
    }

    try {
      controller.getUserByFilter({ username }).then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res
            .status(401)
            .json({ message: "Username and password not authorised" });
        }
      });
    } catch (err) {
      next(err);
    }
  },
  validUserLogin: async function(req, res, next) {
    let { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields username or password" });
    }

    try {
      controller.getUserByFilter({ username }).then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res
            .status(401)
            .json({ message: "Username and password not authorised" });
        }
      });
    } catch (err) {
      next(err);
    }
  },

  // iCrypt solutions
  validUserBodyWithIcrypt: async function(req, res, next) {
    let { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields username or password" });
    }

    password = icrypt.hashPass(password, 100);
    req.newUser = { username, password };
    next();
  },
  validUserAuthedWithIcrypt: async function(req, res, next) {
    const { username, password } = req.headers;

    if (!username || !password) {
      return res
        .status(401)
        .json({ message: "Missing username or password in header" });
    }

    try {
      controller.getUserByFilter({ username }).then(user => {
        if (user && icrypt.comparePass(password, user.password)) {
          next();
        } else {
          res
            .status(401)
            .json({ message: "Username and password not authorised" });
        }
      });
    } catch (err) {
      next(err);
    }
  },
  validUserLoginWithIcrypt: async function(req, res, next) {
    let { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields username or password" });
    }

    try {
      controller.getUserByFilter({ username }).then(user => {
        if (user && icrypt.hashPass(password, user.password)) {
          next();
        } else {
          res
            .status(401)
            .json({ message: "Username and password not authorised" });
        }
      });
    } catch (err) {
      next(err);
    }
  }
};
