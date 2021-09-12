//Dependencies
const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

// Initial setup for /notes Route
// API Get Request
router.get("/notes", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db/db.json"));
  res.json(data);
});

// API POST Request
router.post("/notes", (req, res) => {
  // Read data from 'db.json' file
  let data = JSON.parse(fs.readFileSync("./db/db.json"));

  // Assigned unique id obtained from 'uuid' package
  newNote.id = uuidv4();
  // Extracted new note from request body, and push to db file
  data.push(newNote);

  // Written notes data to 'db.json' file
  fs.writeFileSync("./db/db.json", JSON.stringify(data));

  console.log("\nSuccessfully added new note to 'db.json' file!");
  // Send response
  res.json(data);
});

module.exports = router;
