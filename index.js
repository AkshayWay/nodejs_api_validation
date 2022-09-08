const express = require("express");
const http = require("http");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());
const port = process.env.port || 8080;

const userRoutes = require("./routes/user");
app.use("/", userRoutes);
http.createServer(app).listen(port, function () {
  console.log("Application running on port number " + port);
});
