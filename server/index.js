require("dotenv").config();
const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const dbConnect = require("./src/config/dbConnect");
const {
  notFound,
  errorHandler,
} = require("./src/api/middleware/error/errorHandler");
const { userRoute, projectRoute, boardRoute, sectionRoute } = require("./src/api/routes");
const passportConfig = require("./src/api/middleware/passport/passport");
const app = express();

const { PORT } = process.env;

// Connect to MongoDB
dbConnect();

// For Axios get access to response header fields
const corsOptions = {
  exposedHeaders: "Authorization",
};

// Allow CORS policy
app.use(cors(corsOptions));

// parse application/json (express >= 4.16)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.use("/api/user", userRoute);
app.use("/api/project", projectRoute);
app.use("/api/board", boardRoute);
app.use("/api/section", sectionRoute);

// error handler: MUST below all the routes
app.use(notFound); // error handle will take error from notfound so it must above
app.use(errorHandler);

// server
const _PORT = PORT || 5000;
app.listen(_PORT, console.log(`Server is running ${_PORT}`));
