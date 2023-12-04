const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    name: String,
    logo: Buffer, // Assuming you store the file path or URL
    mname: String,
    phone: String,
    email: String,
    address: String,
});

const FormEntry = mongoose.model("FormEntry", formSchema); // Model name should match

module.exports = FormEntry; // Export the correct model name
