const express = require("express");
const config = require("../config");
const body_parser = require("body-parser");

const app = express();

const user = require("./components/user/network");
const auth = require("./components/auth/network");
const errors = require("../network/error");

app.use(body_parser.json());
// router
app.use("/api/user", user);
app.use("/api/auth", auth);

app.use(errors);

// listener
app.listen(config.api.port, () => {
  console.log("Server started at port: " + config.api.port);
});
