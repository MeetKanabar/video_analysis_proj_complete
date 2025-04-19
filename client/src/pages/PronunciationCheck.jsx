"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ReactMic } from "react-mic"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import BackButton from "../components/BackButton"

const PronunciationCheck = () => {
  const [record, setRecord] = useState(false)
  const [referenceText, setReferenceText] = useState("")
  const [score, setScore] = useState(null)
  const [feedback, setFeedback] = useState("")
  const [transcription, setTranscription] = useState("")

  // Fetch a random reference paragraph from the backend when the component mounts
  useEffect(() => {
    fetch("/api/reference-text")
      .then((res) => res.json())
      .then((data) => setReferenceText(data.referenceText))
      .catch((error) => {
        console.error("ERROR fetching reference text:", error)
        // Fallback text in case the API is not available
        setReferenceText(
          "The quick brown fox jumps over the lazy dog. This pangram contains all letters of the English alphabet. It is often used to test typewriters or keyboards, or to display examples of fonts.",
        )
      })
  }, [])

  // Start recording
  const startRecording = () => {
    setRecord(true)
  }

  // Stop recording
  const stopRecording = () => {
    setRecord(false)
  }

  // Handle the stop event from ReactMic
  const onStop = (recordedBlob) => {
    const formData = new FormData()
    formData.append("audio", recordedBlob.blob)
    formData.append("referenceText", referenceText)

    // Simulate API call since we don't have the actual backend
    setTimeout(() => {
      // Mock response
      setScore(Math.floor(Math.random() * 30) + 70) // Random score between 70-99
      setTranscription(
        referenceText
          .split(" ")
          .slice(0, Math.floor(referenceText.split(" ").length * 0.9))
          .join(" ") + "...",
      )
      setFeedback(
        "Good attempt! Try to speak more clearly and focus on the rhythm of your speech. Pay attention to the stress patterns in multi-syllable words.",
      )
    }, 2000)

    // Uncomment this when you have the actual API
    /*
    fetch("/api/analyze", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setScore(data.score)
        setFeedback(data.feedback)
        setTranscription(data.transcription)
      })
      .catch((error) => console.error("Error analyzing audio:", error))
    */
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 relative">
          <BackButton />

          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Pronunciation Check 🎙️</h1>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Please read the following paragraph aloud:
              </h2>

              <blockquote className="p-4 my-4 bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500 rounded">
                <p className="text-gray-700 dark:text-gray-300">{referenceText || "Loading reference text..."}</p>
              </blockquote>

              <div className="mt-6">
                <div className="bg-black p-4 rounded-lg mb-6">
                  <ReactMic
                    record={record}
                    onStop={onStop}
                    mimeType="audio/wav"
                    strokeColor="#3B82F6"
                    backgroundColor="#000000"
                    className="w-full h-24"
                  />
                </div>

                <div className="flex justify-center gap-4">
                  <motion.button
                    onClick={startRecording}
                    disabled={record}
                    className={`px-6 py-3 rounded-lg transition-all ${
                      record ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                    whileHover={!record ? { scale: 1.05 } : {}}
                    whileTap={!record ? { scale: 0.95 } : {}}
                  >
                    Start Recording
                  </motion.button>

                  <motion.button
                    onClick={stopRecording}
                    disabled={!record}
                    className={`px-6 py-3 rounded-lg transition-all ${
                      !record ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                    whileHover={record ? { scale: 1.05 } : {}}
                    whileTap={record ? { scale: 0.95 } : {}}
                  >
                    Stop Recording
                  </motion.button>
                </div>
              </div>

              {score !== null && (
                <motion.div
                  className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    Your Score: <span className="text-blue-600 dark:text-blue-400">{score.toFixed(2)}%</span>
                  </h2>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Transcription:</h3>
                    <p className="text-gray-700 dark:text-gray-300 p-2 bg-white dark:bg-gray-800 rounded border dark:border-gray-600">
                      {transcription}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Feedback:</h3>
                    <p className="text-gray-700 dark:text-gray-300">{feedback}</p>
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

export default PronunciationCheck
