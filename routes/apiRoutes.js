//Dependencies
const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

// Initial setup for /notes Route
// API Get Request
router.get("/api/notes", (req, res) => {
  console.log("\n\nExecuting GET request");
  let data = JSON.parse(fs.readFileSync("./db/db.json"));
  console.log("\nGET request - Returning notes data: " + JSON.stringify(data));
  res.json(data);
});

// API POST Request
router.post("/api/notes", (req, res) => {
  // Read data from 'db.json' file
  let data = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNote = req.body;
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
// API DELETE request
router.delete("/api/notes/:id", (req, res) => {
  // Fetched id to delete
  let noteId = req.params.id.toString();

  console.log(`\n\nDELETE note request for noteId: ${noteId}`);

  // Read data from 'db.json' file
  let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

  // filter data to get notes except the one to delete
  const newInfo = data.filter((note) => note.id.toString() !== noteId);

  // Write new data to 'db.json' file
  fs.writeFileSync("./db/db.json", JSON.stringify(newInfo));

  console.log(`\nSuccessfully deleted note with id : ${noteId}`);

  // Send response
  res.json(newInfo);
});

module.exports = router;
