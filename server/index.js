const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());

// Upload destination
const upload = multer({ dest: 'uploads/' });

// 🔥 AUDIO ANALYSIS ENDPOINT 🔥
app.post("/analyze", upload.single("audio"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const audioPath = path.join(__dirname, req.file.path);

    console.log("📥 Audio received for analysis:", audioPath);

    // Python script to analyze audio (make sure analyze_audio.py returns JSON)
    const pythonScript = `python server/audio_analysis/analyze_audio.py "${audioPath}"`;

    exec(pythonScript, (error, stdout, stderr) => {
        fs.unlink(audioPath, () => {}); // Clean up uploaded file

        if (error) {
            console.error("❌ Python Script Error:", stderr);
            return res.status(500).json({ error: "Audio analysis failed", details: stderr });
        }

        try {
            const parsedOutput = JSON.parse(stdout.trim());
            return res.json(parsedOutput);
        } catch (parseError) {
            console.error("⚠️ Failed to parse Python output:", parseError);
            return res.status(500).json({ error: "Failed to parse analysis result", raw: stdout });
        }
    });
});

// 🎭 EMOTION PREDICTION ENDPOINT
app.post("/predict", upload.single("audio"), (req, res) => {
    console.log("🎧 Emotion prediction request received");
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = path.join(__dirname, req.file.path);
    exec(`python process_audio.py "${filePath}"`, (error, stdout, stderr) => {
        fs.unlinkSync(filePath); // Delete after processing

        if (error) {
            console.error("Emotion Python Script Error:", stderr);
            return res.status(500).json({ error: stderr });
        }

        let emotion = stdout.trim().split("\n").filter(line => line.trim()).pop();

        // Simplify some emotion categories
        if (emotion === "sad" || emotion === "surprise") {
            emotion = "neutral";
        }

        return res.json({ emotion });
    });
});

// 📚 WORD EXPLORER ENDPOINT
app.get("/word-explorer/:word", (req, res) => {
    const word = req.params.word;
    const pronunciationsDir = path.join(__dirname, "pronunciations");

    // Clean previous pronunciation files
    fs.readdir(pronunciationsDir, (err, files) => {
        if (!err) {
            files.forEach(file => {
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
            res.status(500).json({ error: "Failed to parse response from Python script" });
        }
    });
});

// Serve pronunciation audio files
app.use("/pronunciations", express.static(path.join(__dirname, "pronunciations")));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
