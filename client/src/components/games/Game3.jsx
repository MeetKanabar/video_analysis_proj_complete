import React, { useState, useEffect } from "react";
import { ReactMic } from "react-mic";
import BackButton from "../backButton/BackButton"; // Import the BackButton component

const PronunciationCheck = () => {
  const [record, setRecord] = useState(false);
  const [referenceText, setReferenceText] = useState("");
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [transcription, setTranscription] = useState("");

  // Fetch a random reference paragraph from the backend when the component mounts
  useEffect(() => {
    fetch("/api/reference-text")
      .then((res) => res.json())
      .then((data) => setReferenceText(data.referenceText))
      .catch((error) => console.error("ERROR fetching reference text:", error));
  }, []);

  // Start recording
  const startRecording = () => {
    setRecord(true);
  };

  // Stop recording
  const stopRecording = () => {
    setRecord(false);
  };

  // Handle the stop event from ReactMic
  const onStop = (recordedBlob) => {
    const formData = new FormData();
    formData.append("audio", recordedBlob.blob);
    formData.append("referenceText", referenceText);

    fetch("/api/analyze", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setScore(data.score);
        setFeedback(data.feedback);
        setTranscription(data.transcription);
      })
      .catch((error) => console.error("Error analyzing audio:", error));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <BackButton /> {/* Add the BackButton component */}
      <h1>Pronunciation Check</h1>
      <p>Please read the following paragraph aloud:</p>
      <blockquote
        style={{
          padding: "1rem",
          backgroundColor: "#f0f0f0",
          borderLeft: "4px solid #ccc",
          marginBottom: "2rem",
        }}
      >
        {referenceText}
      </blockquote>

      <ReactMic
        record={record}
        onStop={onStop}
        mimeType="audio/wav"
        strokeColor="#000"
        backgroundColor="#fff"
      />

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={startRecording}
          style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}
        >
          Start Recording
        </button>
        <button onClick={stopRecording} style={{ padding: "0.5rem 1rem" }}>
          Stop Recording
        </button>
      </div>

      {score !== null && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Your Score: {score.toFixed(2)}%</h2>
          <p>
            <strong>Transcription:</strong> {transcription}
          </p>
          <p>
            <strong>Feedback:</strong>
          </p>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default PronunciationCheck;
