"use client"

import { useState, useRef, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, Video, X, StopCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Webcam } from "react-webcam"

const VideoInput = ({ mode = "upload", onFileUpload, isRecording, onRecordingStart, onRecordingStop, videoRef }) => {
  const [file, setFile] = useState(null)
  const [recordedChunks, setRecordedChunks] = useState([])
  const mediaRecorderRef = useRef(null)
  const webcamRef = useRef(null)

  const clearFile = (e) => {
    e.stopPropagation()
    setFile(null)
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        setFile(file)
        onFileUpload(file)
      }
    },
    [onFileUpload],
  )

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".webm"],
    },
    maxFiles: 1,
    disabled: mode === "record",
  })

  const handleStartRecording = useCallback(() => {
    setRecordedChunks([])
    if (webcamRef.current && webcamRef.current.video) {
      const stream = webcamRef.current.video.srcObject
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      })
      mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable)
      mediaRecorderRef.current.start()
      onRecordingStart()
    }
  }, [onRecordingStart])

  const handleDataAvailable = useCallback(({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => [...prev, data])
    }
  }, [])

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setTimeout(() => {
        if (recordedChunks.length) {
          const blob = new Blob(recordedChunks, {
            type: "video/webm",
          })
          onRecordingStop(blob)
        }
      }, 100)
    }
  }, [recordedChunks, onRecordingStop])

  if (mode === "record") {
    return (
      <div className="flex flex-col items-center">
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
          <Webcam
            audio={true}
            ref={webcamRef}
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "user",
            }}
            className="w-full h-full object-cover"
          />
          {isRecording && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Recording
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-center gap-4">
          {!isRecording ? (
            <Button
              onClick={handleStartRecording}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            >
              <Video size={16} />
              Start Recording
            </Button>
          ) : (
            <Button
              onClick={handleStopRecording}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <StopCircle size={16} />
              Stop Recording
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600"
        }`}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <Video size={24} className="text-blue-500" />
              <span className="text-gray-800 dark:text-gray-200 font-medium">{file.name}</span>
              <button
                onClick={clearFile}
                className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <X size={16} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
        ) : (
          <>
            <Upload size={36} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            {isDragActive ? (
              <p className="text-blue-600 dark:text-blue-400 font-medium">Drop the video here...</p>
            ) : (
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Drag & drop a video file here, or click to select
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Supports .mp4, .mov, .avi, and .webm files</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default VideoInput
