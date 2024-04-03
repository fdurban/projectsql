import express from "express";

import { getNotes, getNote, createNote } from "./database.js";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.listen(3000, () => {
  console.log("Server runing on port 3000");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

app.get("/notes", async (req, res) => {
  const notes = await getNotes();
  res.send(notes);
});
app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  const note = await createNote(title, contents);
  res.status(201).send(note);
});
