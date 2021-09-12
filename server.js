//required dependencies/modules
const express = require("express");
const path = require("path");
//Server application at port 3001
const app = express();
const PORT = process.env.PORT || 3001;
// js files needed to application to work
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", apiRoutes);
app.use("/", htmlRoutes);
//Use public folder
app.use(express.static("public"));
//Add listener
app.listen(PORT, () => {
  console.log("App is now listening on PORT: " + PORT);
});
