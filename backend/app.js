const express = require("express");
const cokkieParser = require('cookie-parser');
const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cokkieParser());

const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//Middleware for error
app.use(errorMiddleware);

module.exports = app;