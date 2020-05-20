const db = require("../data/db-config.js");

module.exports = {
  getAllUsers,
  addNewUser,
  findUser
}

function getAllUsers() {
  return db("users")
}

function addNewUser(user) {
  return db("users")
  .insert(user)
}

function findUser(username) {
  return db("users")
  .where({ username })
  .first()
}