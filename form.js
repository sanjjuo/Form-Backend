const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const app = express();
const FormEntry = require("./formschema");

// Middleware to enable CORS
app.use(cors());
app.use(express.json());

// Multer Middleware for handling file uploads
const storage = multer.memoryStorage(); // Store file as Buffer in memory
const upload = multer({ storage: storage });

mongoose.connect("mongodb://127.0.0.1:27017/Form", { useNewUrlParser: true, useUnifiedTopology: true });

app.post("/", upload.single('logo'), function (req, res) {
  const info = req.body;

  // Access the file data as a Buffer from req.file.buffer
  const logoData = req.file ? req.file.buffer : undefined;

  // Create a new instance of the FormEntry model
  const dataForms = new FormEntry({
    name: info.name,
    mname: info.mname,
    phone: info.phone,
    email: info.email,
    address: info.address,
    logo: logoData // Save file data to the database
  });

  // Save the data to the database
  dataForms.save()
    .then(function (result) {
      console.log("Data saved:", result);
      res.status(201).json({ message: "Data saved successfully", data: result });
    })
    .catch(function (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ message: "Error saving data" });
    });
});

app.get("/form", function (req, res) {
  FormEntry.find()
    .then(function (response) {
      console.log("data send is", response);
      res.json(response);
    })
    .catch(function (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({ message: "Error retrieving data" });
    });
});

app.listen(5002, function () {
  console.log("Server is started on port: 5002");
});
