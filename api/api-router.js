const express = require("express");
const api = require("./api-helpers.js");
const bc = require('bcryptjs');
const jwt = require("jsonwebtoken");
const restrict = require("../middleware/restrict")


const router = express.Router();

router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bc.hashSync(req.body.password, 16)

  user.password = hash

  api.addNewUser(user)
  .then(
    newUser => {
      res.status(201).json(newUser)
    })
  .catch(error => {
    console.error(error)
    res.status(500).json({
      message: 'Cannot register new user'
    })
  })
})

router.get('/users', (req, res) => {
  api.getAllUsers()
  .then(
    theUsers => {
      res.status(200).json(theUsers)
    })
  .catch(error => {
    console.error(error)
    res.status(500).json({
      message: 'Unable to get users'
    })
  })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const tokenPayload = {
    userId: username.id,
    userRole: "normal" // fake, would normally come from DB
  }

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET)

  api.findUser(username)
  .then(user => {
    if(user && bc.compareSync(password, user.password)) {
      return res.status(201).json({  message: "Login success", token: token})
    } 
    else {
      return res.status(400).json({ error: 'Error loggin in'})
    }
    

  })
})

module.exports = router