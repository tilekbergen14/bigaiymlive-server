const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/images/", express.static("images"));
app.use("/", require("./Image/routes"));
app.use("/login", require("./Auth/login"));
app.use("/register", require("./Auth/register"));

app.listen(
  5000,
  mongoose
    .connect(
      `mongodb+srv://admin:${process.env.MONGO_PASS}@cluster0.4euzm.mongodb.net/cluster0?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connected to the database"))
    .catch((error) => console.log(error))
);
