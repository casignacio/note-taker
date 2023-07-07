const router = require("express").Router();
const fs = require("fs");

const uuid = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

// Defines the get request to this routes end point '/api/notes'
router.get('/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(dbJson);
});

// Defines the post request to this routes end point '/api/notes'
router.post('/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuid(),
    };
    dbJson.push(newFeedback);
    fs.writeFileSync("./db/db.json", JSON.stringify(dbJson));
    res.json(dbJson);
});

router.delete('/notes/:id', (req, res) => {
    let data = fs.readFileSync("./db/db.json", "utf8");
    const dataJSON = JSON.parse(data);
    const newNotes = dataJSON.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync("./db/db.json", JSON.stringify(newNotes));
    res.json("Note deleted.");
});

module.exports = router; 