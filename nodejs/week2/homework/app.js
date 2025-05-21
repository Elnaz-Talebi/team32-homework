import express from "express";
const app = express();
const port = process.env.PORT || 3000;

// Support parsing JSON requests
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is a search engine");
});

import fs from "fs";
const documents = JSON.parse(fs.readFileSync("documents.json", "utf-8"));

app.get("/search", (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(200).json(documents);
  }

  const filtered = documents.filter((doc) => {
    return Object.values(doc).some((value) =>
      String(value).toLowerCase().includes(query.toLowerCase())
    );
  });
  if (filtered.length === 0) {
    return res.status(404).json({ message: "No documents match your query." });
  }
  res.status(200).json(filtered);
});

app.post("/search", (req, res) => {
  const query = req.query.q;
  const fields = req.body.fields;

  if (query && fields) {
    return res.status(400).json({
      error:
        'You cannot use both query parameter "q" and body field "fields" at the same time.',
    });
  }
  if (!query && !fields) {
    return res.status(200).json(documents);
  }

  if (query) {
    const filtered = documents.filter((doc) =>
      Object.values(doc).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    );

    return filtered.length > 0
      ? res.status(200).json(filtered)
      : res.status(404).json({ message: "No documents match your query." });
  }
  if (fields && typeof fields === "object") {
    const filtered = documents.filter((doc) =>
      Object.entries(fields).every(
        ([key, value]) =>
          String(doc[key]).toLowerCase() === String(value).toLowerCase()
      )
    );

    return filtered.length > 0
      ? res.status(200).json(filtered)
      : res
          .status(404)
          .json({ message: "No documents match the given fields." });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
