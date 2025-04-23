"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, X } from "lucide-react"

const TextInput = ({ text, onTextChange }) => {
  const [activeTab, setActiveTab] = useState("paste")
  const [file, setFile] = useState(null)

  const handleTextAreaChange = (e) => {
    onTextChange(e.target.value)
  }

  const clearFile = (e) => {
    e.stopPropagation()
    setFile(null)
    onTextChange("")
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        setFile(file)

        // Read file content
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target.result
          onTextChange(content)
        }
        reader.readAsText(file)
      }
    },
    [onTextChange],
  )

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  })

  // Animation variants
  const tabVariants = {
    inactive: { opacity: 0.7 },
    active: { opacity: 1 },
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <motion.button
          className={`flex-1 py-4 px-6 text-center font-medium ${
            activeTab === "paste"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("paste")}
          variants={tabVariants}
          animate={activeTab === "paste" ? "active" : "inactive"}
        >
          <div className="flex items-center justify-center gap-2">
            <FileText size={18} />
            <span>Paste Text</span>
          </div>
        </motion.button>
        <motion.button
          className={`flex-1 py-4 px-6 text-center font-medium ${
            activeTab === "upload"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("upload")}
          variants={tabVariants}
          animate={activeTab === "upload" ? "active" : "inactive"}
        >
          <div className="flex items-center justify-center gap-2">
            <Upload size={18} />
            <span>Upload File</span>
          </div>
        </motion.button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "paste" ? (
          <div>
            <div className="text-center mb-4">
              <p className="text-gray-600 dark:text-gray-300">Paste your text below for analysis</p>
            </div>
            <textarea
              value={text}
              onChange={handleTextAreaChange}
              placeholder="Enter your text here..."
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        ) : (
          <div>
            <div className="text-center mb-4">
              <p className="text-gray-600 dark:text-gray-300">Upload a text file (.txt, .docx, or .pdf)</p>
            </div>
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
                    <FileText size={24} className="text-blue-500" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{file.name}</span>
                    <button
                      onClick={clearFile}
                      className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      <X size={16} className="text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              ) : (
                <>
                  <Upload size={36} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                  {isDragActive ? (
                    <p className="text-blue-600 dark:text-blue-400 font-medium">Drop the file here...</p>
                  ) : (
                    <div>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        Drag & drop a file here, or click to select
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Supports .txt, .docx, and .pdf files</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TextInput
