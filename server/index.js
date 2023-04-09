const express = require("express");
const app = express();

app.use(express.json());

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/codeSnippetManager")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to Mongodb...", err));