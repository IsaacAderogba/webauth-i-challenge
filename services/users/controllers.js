const Users = require('./model');

module.exports = {
  getUsers: async function() {
    return await Users.findUsers();
  },
  getUserById: async function(id) {
    return await Users.findUserById(id);
  },
  postUser: async function(user) {
    return await Users.insertUser(user);
  }
}