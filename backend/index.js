const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs");

const app = express();

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../Uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/Uploads", express.static(path.join(__dirname, "../Uploads")));

// Upload and analyze endpoint
app.post("/api/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded" });
    }

    const videoPath = path.resolve(req.file.path);
    const videoUrl = `http://localhost:5000/Uploads/${req.file.filename}`;

    // Run video analysis
    const pythonProcess = spawn("python", [
      path.join(__dirname, "../video_analysis.py"),
      videoPath,
    ]);

    let result = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => (result += data));
    pythonProcess.stderr.on("data", (data) => (errorOutput += data));

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          const analysisResult = JSON.parse(result);
          res.json({
            videoUrl,
            emotions: analysisResult.emotions || {
              primaryEmotion: "Neutral",
              emotionScores: [
                { name: "Neutral", score: 100 },
              ],
            },
            eyeContact: analysisResult.eyeContact || { score: 0 },
            posture: analysisResult.posture || { score: 0 },
            engagement: analysisResult.engagement || { averageScore: 0 },
            overallScore: analysisResult.overallScore || 0,
            strengths: analysisResult.strengths || [],
            improvements: analysisResult.improvements || [],
            timestamp: new Date().toISOString(),
          });
        } catch (e) {
          res.status(500).json({ error: "Invalid analysis output", details: e.message });
        }
      } else {
        res.status(500).json({ error: "Analysis failed", details: errorOutput });
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to process video" });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));