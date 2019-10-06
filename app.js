const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const routes = require("./routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => res.redirect('/api/v1/users'));
app.use("/api/v1", routes);

app.use((err, req, res, next) => {
  res.status(err.status).json(err);
});

module.exports = app;
