"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface VideoRecorderProps {
  onRecordingComplete: (blob: Blob) => void
}

const VideoRecorder = ({ onRecordingComplete }: VideoRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [error, setError] = useState("")

  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      // Clean up when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      setError("")
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setError("Could not access camera or microphone. Please ensure you have granted the necessary permissions.")
    }
  }

  useEffect(() => {
    startCamera()
  }, [])

  const startRecording = () => {
    if (!streamRef.current) return

    chunksRef.current = []
    const mediaRecorder = new MediaRecorder(streamRef.current)

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data)
      }
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/mp4" })
      setVideoBlob(blob)
      onRecordingComplete(blob)
    }

    mediaRecorderRef.current = mediaRecorder
    mediaRecorder.start()
    setIsRecording(true)

    // Start timer
    setRecordingTime(0)
    timerRef.current = window.setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const resetRecording = () => {
    setVideoBlob(null)
    startCamera()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl aspect-video bg-black rounded-lg overflow-hidden relative">
        {!videoBlob ? (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            {isRecording && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center">
                <span className="animate-pulse mr-2 h-3 w-3 bg-white rounded-full inline-block"></span>
                <span>{formatTime(recordingTime)}</span>
              </div>
            )}
          </>
        ) : (
          <video src={URL.createObjectURL(videoBlob)} controls className="w-full h-full" />
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 w-full">{error}</div>
      )}

      <div className="flex space-x-4 mt-6">
        {!videoBlob ? (
          <>
            {!isRecording ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startRecording}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="6" />
                </svg>
                Start Recording
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopRecording}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <rect x="6" y="6" width="8" height="8" />
                </svg>
                Stop Recording
              </motion.button>
            )}
          </>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetRecording}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Record Again
          </motion.button>
        )}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        Tip: Speak clearly and face the camera directly for best results.
      </p>
    </div>
  )
}

export default VideoRecorder
