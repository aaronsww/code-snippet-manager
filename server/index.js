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

app.post("/api/languages/:id/add-snippet", async (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  const code = req.body.code;

  try {
    const language = await Language.findOneAndUpdate(
      { _id: id },
      { $push: { snippet: { title, code } } },
      { new: true }
    );

    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    return res.json(language);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5000, () => console.log("Listening on port 5000"));
