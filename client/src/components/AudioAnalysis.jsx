import React, { useState, useEffect } from "react";
import { ReactMic } from "react-mic";
import axios from "axios";
import { Scatter } from "react-chartjs-2";
import Navbar from "./Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [emotions, setEmotions] = useState([]);

  const startRecording = () => setRecording(true);
  const stopRecording = () => setRecording(false);

  const onStop = (recordedBlob) => {
    setBlobURL(recordedBlob.blobURL);
    sendAudioToServer(recordedBlob.blob);
  };

  const sendAudioToServer = async (blob) => {
    const formData = new FormData();
    formData.append("audio", blob, "recording.wav");

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Server Response:", response.data);

      let parsedEmotions = [];
      try {
        parsedEmotions = JSON.parse(response.data.emotion.replace(/'/g, '"'));
      } catch (err) {
        console.error("Error parsing emotions:", err);
      }

      setEmotions(Array.isArray(parsedEmotions) ? parsedEmotions : []);
    } catch (error) {
      console.error("Error predicting emotion:", error);
    }
  };

  useEffect(() => {
    console.log("Updated Emotions State:", emotions);
  }, [emotions]);

  const uniqueEmotions = [
    "angry",
    "disgust",
    "fear",
    "happy",
    "neutral",
    "sad",
    "surprise",
  ];

  // ✅ Correct Chart Data: Using Emotion Names Directly
  const data = {
    datasets: [
      {
        label: "Emotion Over Time",
        data: emotions
          .filter((emotion) => uniqueEmotions.includes(emotion)) // Ensure only known emotions are plotted
          .map((emotion, index) => ({
            x: (index + 1) * 5, // X-axis: Time in seconds
            y: emotion, // Y-axis: Emotion (use name, not index)
          })),
        backgroundColor: "rgb(75, 192, 192)",
        pointRadius: 6,
      },
    ],
  };

  // ✅ Ensure Emotion Labels Are Properly Mapped
  const options = {
    scales: {
      y: {
        type: "category",
        labels: uniqueEmotions, // Use unique emotion labels
        title: {
          display: true,
          text: "Emotions",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time (seconds)",
        },
      },
    },
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-10">
        <h2 className="text-4xl font-semibold text-blue-400 text-center mb-12">
          Audio Emotion Analysis
        </h2>

        <div className="bg-blue-400 rounded-xl p-8 shadow-lg text-center w-full max-w-lg">
          <div className="bg-black p-4 rounded-md mb-6">
            <ReactMic
              record={recording}
              className="w-full h-24"
              onStop={onStop}
              strokeColor="#FF0000"
              backgroundColor="#000000"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={startRecording}
              disabled={recording}
              className={`px-6 py-3 text-white font-medium rounded-lg transition-all ${
                recording ? "bg-gray-600" : "bg-red-900 hover:bg-green-600"
              }`}
            >
              Start Recording
            </button>
            <button
              onClick={stopRecording}
              disabled={!recording}
              className={`px-6 py-3 text-white font-medium rounded-lg transition-all ${
                !recording ? "bg-gray-600" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Stop Recording
            </button>
          </div>

          {blobURL && (
            <div className="mt-6">
              <h3 className="text-white text-lg font-medium">
                Recorded Audio:
              </h3>
              <audio src={blobURL} controls className="mt-2 w-full" />
            </div>
          )}

          {emotions.length > 0 && (
            <h3 className="mt-6 text-lg font-medium text-white">
              <span className="text-gray-300">Predicted Emotions:</span>{" "}
              {emotions.join(", ")}
            </h3>
          )}

          <div className="mt-6 w-full">
            <Scatter data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
