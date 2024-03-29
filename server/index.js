const express = require("express");
var cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());

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
  console.log("Received POST request to /api/languages/add");
  console.log(req.body);

  const language = new Language({
    name: req.body.name,
    snippet: {
      title: req.body.snippet[0].title,
      code: req.body.snippet[0].code,
    },
  });
  const result = await language.save();
  console.log("Saved new language to database:", result);
  return res.json(result);
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

app.patch(
  "/api/languages/:languageId/snippets/:snippetId/update-snippet",
  async (req, res) => {
    const { languageId, snippetId } = req.params;
    const { code } = req.body;

    try {
      const language = await Language.findOneAndUpdate(
        { _id: languageId, "snippet._id": snippetId },
        { $set: { "snippet.$.code": code } },
        { new: true }
      );

      if (!language) {
        return res
          .status(404)
          .json({ message: "Language or snippet not found" });
      }

      return res.json(language);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.delete("/api/languages/:id/snippets/:snippetId", async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }
    language.snippet.pull(req.params.snippetId);
    await language.save();
    res.json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(5000, () => console.log("Listening on port 5000"));
