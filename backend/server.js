const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Accident Detection Backend Running");
});

// API route called by frontend
app.post("/report-accident", (req, res) => {
  
  const { location } = req.body;

  console.log("Location:", location);

  // Dummy response
  const result = {
    location: location,
    confidence: 95,
    status: "Accident Detected",
    accident_id: "ACC12345"
  };

  res.json(result);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
