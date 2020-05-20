const express = require("express");
const cors = require("cors");
const session = require("express-session");
// const KnexSessionStore = require("connect-session-knex")(session);

const server = express();
const apiRouter = require('./api/api-router.js');

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  return res.send("✔️✔️✔️")
})

server.use("/api", apiRouter)

module.exports = server;