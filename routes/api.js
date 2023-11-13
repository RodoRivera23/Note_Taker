const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

// get all notes
router.get('/api/notes', async (req, res) => {
    try {
        const data = await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error when retrieve notes" });
    }
});

// post a new note
router.post('/api/notes', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
        const parameters = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4(),
        };
        data.push(parameters);
        fs.writeFileSync("db/db.json", JSON.stringify(data));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error when save new note" });
    }
});

// delete a note
router.delete('/api/notes/:id', (req, res) => {
    try {
        const data = fs.readFileSync("db/db.json", "utf8");
        const dataJson = JSON.parse(data);
        const newNote = dataJson.filter((note) => note.id !== req.params.id);
        fs.writeFileSync("db/db.json", JSON.stringify(newNote));
        res.json({ message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error when date a note" });
    }
});

//also to export to other parts of the code
module.exports = router;