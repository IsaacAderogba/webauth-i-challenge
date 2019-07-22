const bcrypt = require("bcryptjs");
const controller = require("./controllers");

module.exports = {
  validCreateUser: async function(req, res, next) {
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
  }
};
