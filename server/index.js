const express = require("express");
const app = express();

app.use(express.json());

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/codeSnippetManager")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to Mongodb...", err));

const languageSchema = new mongoose.Schema({
  name: String,
  snippet: [{ title: String, code: String }],
});

const Language = mongoose.model("Language", languageSchema);

app.get("/api/languages", async (req, res) => {
  const languages = await Language.find();
  return res.json(languages);
});

app.post("/api/languages/add", async (req, res) => {
  const snippetData = req.body.snippet.map((snippet) => ({
    title: snippet.title,
    code: snippet.code,
  }));

  const language = new Language({
    name: req.body.name,
    snippet: snippetData,
  });

  const result = await language.save();

  return res.json(result);
});

app.listen(5000, () => console.log("Listening on port 5000"));
