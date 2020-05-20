const express = require("express");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const server = express();
const apiRouter = require('./api/api-router.js')
const userRouter = require('./users/users-router.js')

server.use(express.json());
server.use(cors());
server.use(session({
	name: "sess", // overwrites the default cookie name, hides our stack better
	resave: false, // avoid recreating sessions that have not changed
	saveUninitialized: false, // GDPR laws against setting cookies automatically
	secret: "keep it secret, keep it safe", // cryptographically sign the cookie
}))


server.use('/users', userRouter)
server.use('/api', apiRouter)

server.get("/", (req, res, next) => {
  return res.send("✔️✔️✔️")
})
module.exports = server