"use client"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import VideoRecorder from "../components/VideoRecorder"
import VideoUploader from "../components/VideoUploader"
import Header from "../components/Header"

const MainInterface = () => {
  const [activeTab, setActiveTab] = useState<"record" | "upload">("record")
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState("")
  const videoUrlRef = useRef<string>("")
  const navigate = useNavigate()

  const handleRecordingComplete = (blob: Blob) => {
    setVideoBlob(blob)
    setVideoFile(null)
  }

  const handleFileUpload = (file: File) => {
    setVideoFile(file)
    setVideoBlob(null)
  }

  const handleUpload = async () => {
    if (!videoBlob && !videoFile) {
      setUploadError("Please record or upload a video first")
      return
    }

    setIsUploading(true)
    setUploadError("")
    setUploadProgress(0)

    try {
      const formData = new FormData()

      if (videoBlob) {
        const file = new File([videoBlob], "recorded_video.mp4", { type: "video/mp4" })
        formData.append("video", file)
      } else if (videoFile) {
        formData.append("video", videoFile)
      }

      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(progress)
          }
        },
      })

      videoUrlRef.current = response.data.videoUrl
      navigate("/analysis", { state: { videoUrl: response.data.videoUrl } })
    } catch (error) {
      console.error("Upload error:", error)
      setUploadError("Failed to upload video. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Header />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "record"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("record")}
          >
            Record Video
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "upload"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Upload Video
          </button>
        </div>

        <div className="mb-6">
          {activeTab === "record" ? (
            <VideoRecorder onRecordingComplete={handleRecordingComplete} />
          ) : (
            <VideoUploader onFileSelected={handleFileUpload} />
          )}
        </div>

        {uploadError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{uploadError}</div>
        )}

        {isUploading ? (
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Uploading...</span>
              <span className="text-sm font-medium">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpload}
            disabled={!videoBlob && !videoFile}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
              !videoBlob && !videoFile ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Upload & Continue
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default MainInterface
