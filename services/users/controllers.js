const Users = require('./model');

module.exports = {
  getUsers: async function() {
    return await Users.findUsers();
  },
  getUserById: async function(id) {
    return await Users.findUserById(id);
  },
  getUserByFilter: async function(filter) {
    return await Users.findUserByFilter(filter);
  },
  postUser: async function(user) {
    return await Users.insertUser(user);
  }
}