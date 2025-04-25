const express = require("express");
const multer = require("multer");
const path = require("path");
const { exec, execSync } = require("child_process");
const fs = require("fs");
const cors = require("cors");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

const app = express();
app.use(cors());

// Upload destination
const upload = multer({ dest: "uploads/" });

// ✅ Helper: Convert recorded audio to proper WAV format
function convertToWav(inputPath) {
  const outputPath = inputPath + ".wav";
  execSync(
    `"${ffmpegPath}" -y -i "${inputPath}" -ar 22050 -ac 1 -f wav "${outputPath}"`
  );
  return outputPath;
}

// 🔥 AUDIO ANALYSIS ENDPOINT 🔥
app.post("/audio-analysis", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    console.error("❌ No file received");
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = path.join(__dirname, req.file.path);
  const wavPath = convertToWav(filePath);

  exec(
    `set PYTHONPATH=. && python audio_analysis/analyze_audio.py "${wavPath}"`,
    (err, stdout, stderr) => {
      fs.unlinkSync(filePath);
      fs.unlinkSync(wavPath);

      if (err) {
        console.error("❌ Python execution error:", err.message);
        return res.status(500).json({ error: stderr || err.message });
      }

      try {
        const result = JSON.parse(stdout);
        res.json(result);
        console.log("✅ JSON parsed successfully:");
      } catch (e) {
        console.error("🚨 Failed to parse JSON from Python:", e.message);
        console.log("⚠️ Raw output:", stdout);
        res
          .status(500)
          .json({ error: "Invalid JSON returned by Python script" });
      }
    }
  );
});

// 🎭 EMOTION PREDICTION ENDPOINT
app.post("/predict", upload.single("audio"), (req, res) => {
  console.log("🎧 Emotion prediction request received");
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = path.join(__dirname, req.file.path);
  exec(`python process_audio.py "${filePath}"`, (error, stdout, stderr) => {
    fs.unlinkSync(filePath); // Delete after processing

    console.log("🐍 Raw stdout from Python:", stdout); // Log raw stdout for debugging

    if (error) {
      console.error("Emotion Python Script Error:", stderr);
      return res.status(500).json({ error: stderr });
    }

    try {
      // Extract JSON part from stdout
      const jsonStartIndex = stdout.indexOf("{");
      const jsonEndIndex = stdout.lastIndexOf("}");
      const cleanedOutput = stdout.slice(jsonStartIndex, jsonEndIndex + 1);

      const parsed = JSON.parse(cleanedOutput);
      console.log("✅ Parsed JSON:", parsed);
      res.json(parsed);
    } catch (e) {
      console.error("🚨 Failed to parse JSON from Python:", e.message);
      console.log("⚠️ Raw output:", stdout);
      res.status(500).json({ error: "Invalid JSON returned by Python script" });
    }
  });
});

app.post("/text-analysis", express.json(), upload.none(), (req, res) => {
  const { text } = req.body;

  const parameters = {
    structure: true,
    style: true,
    grammar: true,
    keywords: true,
    readability: true,
  };

  if (!text || !parameters) {
    return res.status(400).json({ error: "Text and parameters are required." });
  }

  // Prepare shell-safe JSON input string
  const escapedInput = JSON.stringify({ text, parameters }).replace(
    /"/g,
    '\\"'
  );

  const command =
    process.platform === "win32"
      ? `set PYTHONPATH=. && python text_analysis/analyze_text.py "${escapedInput}"`
      : `PYTHONPATH=. python3 text_analysis/analyze_text.py "${escapedInput}"`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Python execution error:", stderr || err.message);
      return res.status(500).json({ error: stderr || err.message });
    }


    try {
      const jsonStart = stdout.indexOf("{");
      const jsonEnd = stdout.lastIndexOf("}");
      const cleaned = stdout.slice(jsonStart, jsonEnd + 1);
      const result = JSON.parse(cleaned);


      res.json(result);
    } catch (e) {
      console.error("🚨 Failed to parse JSON from Python:", e.message);
      console.log("⚠️ Raw output:", stdout);
      res.status(500).json({ error: "Invalid JSON returned by Python script" });
    }
  });
});

// 📚 WORD EXPLORER ENDPOINT
app.get("/word-explorer/:word", (req, res) => {
  const word = req.params.word;
  const pronunciationsDir = path.join(__dirname, "pronunciations");

  // Clean previous pronunciation files
  fs.readdir(pronunciationsDir, (err, files) => {
    if (!err) {
      files.forEach((file) => {
        fs.unlink(path.join(pronunciationsDir, file), () => {});
      });
    }
  });

  exec(`python process_word.py "${word}"`, (error, stdout, stderr) => {
    if (error) {
      console.error("process_word.py Error:", stderr);
      return res.status(500).json({ error: stderr });
    }

    try {
      const parsed = JSON.parse(stdout);
      res.json(parsed);
    } catch (e) {
      res
        .status(500)
        .json({ error: "Failed to parse response from Python script" });
    }
  });
});

// Serve pronunciation audio files
app.use(
  "/pronunciations",
  express.static(path.join(__dirname, "pronunciations"))
);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
