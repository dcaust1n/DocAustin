require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { parse } = require("json2csv");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Define Schema & Models
const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  type: String, // "writer" or "speaker" or "newsletter"
  submittedAt: { type: Date, default: Date.now }
});
const FormData = mongoose.model("FormData", FormSchema);

// Route: Handle Writer Requests
app.post("/writer-request", async (req, res) => {
  try {
    const newEntry = new FormData({ ...req.body, type: "writer" });
    await newEntry.save();
    res.json({ message: "Writer request submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

// Route: Handle Speaker Requests
app.post("/speaker-request", async (req, res) => {
  try {
    const newEntry = new FormData({ ...req.body, type: "speaker" });
    await newEntry.save();
    res.json({ message: "Speaker request submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

// Route: Handle Newsletter Requests
app.post("/newsletter-request", async (req, res) => {
  try {
    const newEntry = new FormData({ ...req.body, type: "newsletter" });
    await newEntry.save();
    res.json({ message: "Newsletter request submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

// Route: Export Data as CSV
app.get("/export", async (req, res) => {
  try {
    const data = await FormData.find();
    const csv = parse(data, { fields: ["name", "email", "message", "type", "submittedAt"] });

    res.setHeader("Content-Disposition", "attachment; filename=contact_form_data.csv");
    res.set("Content-Type", "text/csv");
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: "Error exporting data", error });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
