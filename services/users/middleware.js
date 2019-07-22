const bcrypt = require('bcryptjs');
const controller = require('./controllers');

module.exports = {
  validCreateUser: async function(req, res, next) {
    let { username, password } = req.body;

    if(!username || !password) {
      return res.status(400).json({message: 'Missing required fields username or password'});
    }

    password = bcrypt.hashSync(password, 12);
    req.newUser = { username, password };
    next();
  }
}