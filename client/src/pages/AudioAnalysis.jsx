"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ReactMic } from "react-mic"
import { Scatter } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import axios from "axios"

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend)

const AudioAnalysis = () => {
  const [recording, setRecording] = useState(false)
  const [blobURL, setBlobURL] = useState("")
  const [emotions, setEmotions] = useState([])

  const startRecording = () => setRecording(true)
  const stopRecording = () => setRecording(false)

  const onStop = (recordedBlob) => {
    setBlobURL(recordedBlob.blobURL)
    sendAudioToServer(recordedBlob.blob)
  }

  const sendAudioToServer = async (blob) => {
    const formData = new FormData()
    formData.append("audio", blob, "recording.wav")

    try {
      // Simulate API call since we don't have the actual backend
      // setTimeout(() => {
      //   // Mock response with a random sequence of emotions
      //   const mockEmotions = []
      //   const possibleEmotions = ["happy", "sad", "angry", "neutral", "disgust", "fear", "surprise"]

      //   for (let i = 0; i < 10; i++) {
      //     mockEmotions.push(possibleEmotions[Math.floor(Math.random() * possibleEmotions.length)])
      //   }

      //   setEmotions(mockEmotions)
      // }, 2000)

      // Uncomment this when you have the actual API
      
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      console.log("Server Response:", response.data)

      let parsedEmotions = []
      try {
        parsedEmotions = JSON.parse(response.data.emotion.replace(/'/g, '"'))
      } catch (err) {
        console.error("Error parsing emotions:", err)
      }

      setEmotions(Array.isArray(parsedEmotions) ? parsedEmotions : [])
      
    } catch (error) {
      console.error("Error predicting emotion:", error)
    }
  }

  useEffect(() => {
    console.log("Updated Emotions State:", emotions)
  }, [emotions])

  const uniqueEmotions = ["happy", "sad", "angry", "neutral", "disgust", "fear", "surprise"]

  // Chart Data: Using Emotion Names Directly
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
  }

  // Ensure Emotion Labels Are Properly Mapped
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
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Audio Emotion Analysis
            </h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
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
                <motion.button
                  onClick={startRecording}
                  disabled={recording}
                  className={`px-6 py-3 text-white font-medium rounded-lg transition-all ${
                    recording ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  whileHover={!recording ? { scale: 1.05 } : {}}
                  whileTap={!recording ? { scale: 0.95 } : {}}
                >
                  Start Recording
                </motion.button>
                <motion.button
                  onClick={stopRecording}
                  disabled={!recording}
                  className={`px-6 py-3 text-white font-medium rounded-lg transition-all ${
                    !recording ? "bg-gray-600" : "bg-red-500 hover:bg-red-600"
                  }`}
                  whileHover={recording ? { scale: 1.05 } : {}}
                  whileTap={recording ? { scale: 0.95 } : {}}
                >
                  Stop Recording
                </motion.button>
              </div>

              {blobURL && (
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Recorded Audio:</h3>
                  <audio src={blobURL} controls className="mt-2 w-full" />
                </motion.div>
              )}

              {emotions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="mt-6 text-lg font-medium text-gray-800 dark:text-gray-200">
                    <span className="text-gray-600 dark:text-gray-400">Predicted Emotions:</span> {emotions.join(", ")}
                  </h3>

                  <div className="mt-6 bg-white dark:bg-gray-700 p-4 rounded-lg">
                    <Scatter data={data} options={options} />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AudioAnalysis
