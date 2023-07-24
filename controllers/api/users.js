const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const Note = require("../../models/note");

module.exports = {
  create,
  load,
};

async function create(req, res) {

}

async function load(req, res) {
    try {
        const userId = useParams();
        const notes = Note.find({ user: userId });
        res.json(notes);
      } catch (err) {
        res.status(400).json({ error: "Failed to get notes for the user." });
      }
}
