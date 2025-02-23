const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://aniketraj19verma:Bm1R6aGA9AkAC2dw@cluster0.vikfe.mongodb.net/devnotes"
);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  noteCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});

const noteSchema = new mongoose.Schema({
  note: String,
});

const User = mongoose.model("User", userSchema);
const Note = mongoose.model("Note", noteSchema);

module.exports = { Note, User };
