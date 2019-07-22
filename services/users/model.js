const db = require("../../data/dbConfig");

module.exports = {
  getUsers: function() {
    return db("users");
  },
  getUserById: function(id) {
    return db("users")
      .where({ id })
      .first();
  },
  createUser: function(user) {
    return db("users")
      .insert(user)
      .then(([id]) => this.getUserById(id));
  }
};
