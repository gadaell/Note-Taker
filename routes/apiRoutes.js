//Dependencies
const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

// Initial setup for /note Route
// API Get Request
router.get("/notes", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db/db.json"));
  res.send(data);
});

// API POST Request
router.post("/notes", (req, res) => {
  // Read data from 'db.json' file
  const data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  // Assigned unique id obtained from 'uuid' package
  let newNoteId = uuidv4();
  // Extracted new note from request body, and push to db file
  data.push({
    title: req.body.title,
    text: req.body.text,
    id: newNoteId,
  });

  // Written notes data to 'db.json' file
  fs.writeFileSync("./db/db.json", JSON.stringify(data));

  console.log("\nSuccessfully added new note to 'db.json' file!");

  // Send response
  res.json(data);
});

module.exports = router;
