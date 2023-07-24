const express = require("express");
const router = express.Router();
const notesCtrl = require("../../controllers/api/notes");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.get("notes/:userId", notesCtrl.load);
router.post("notes/:userId", notesCtrl.create);

// Create a note
router.post('/', checkAuthenticated, async (req, res) => {
    req.body.user = req.user._id;
    try {
        const note = await Note.create(req.body);
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all notes for a user
router.get('/', checkAuthenticated, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json(err);
    }
});