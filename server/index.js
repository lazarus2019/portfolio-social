require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const dbConnect = require("./src/config/dbConnect");
const app = express();

const { PORT } = process.env;

// Connect to MongoDB
dbConnect();

// Middleware
app.use(logger("dev"));

// parse application/json (express >= 4.16)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server
const _PORT = PORT || 5000;
app.listen(_PORT, console.log(`Server is running ${_PORT}`));
