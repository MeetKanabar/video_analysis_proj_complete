"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Upload,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Eye,
  Smile,
  Award,
  Loader,
  Camera,
  BarChart2,
  PieChart,
  Activity,
  Copy,
  Check,
} from "lucide-react";

const VideoAnalysis = () => {
  // State management
  const [activeTab, setActiveTab] = useState("upload"); // "upload" or "record"
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    metrics: true,
    attention: true,
    emotion: true,
    posture: true,
    engagement: true,
  });
  const [copied, setCopied] = useState(false);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  // Handle file upload
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
      "video/webm": [".webm"],
      "video/quicktime": [".mov"],
    },
    maxFiles: 1,
  });

  // Start webcam recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoFile(blob);
        setVideoUrl(url);

        // Stop all tracks
        streamRef.current.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Analyze video
  const analyzeVideo = async () => {
    if (!videoFile) return;

    setIsAnalyzing(true);
    setAnalysisResults(null);

    try {
      // In a real app, you would send the video to your API
      const formData = new FormData();
      formData.append("video", videoFile);
      const response = await fetch("http://localhost:5000/analyze-video", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      // For demo purposes, we'll simulate an API call with a timeout
      // await new Promise((resolve) => setTimeout(resolve, 3000))

      // // Mock response data based on the new format
      // const mockResults = {
      //   presentation_metrics: {
      //     duration: 124.5,
      //     frames_analyzed: 3735,
      //     analysis_quality: 95.3,
      //   },
      //   eye_contact_analysis: {
      //     looking_at_screen: 112,
      //     not_looking_at_screen: 12.5,
      //     attention_percentage: 90,
      //   },
      //   emotion_analysis: {
      //     happy: 0.45,
      //     neutral: 0.35,
      //     enthusiastic: 0.15,
      //     concerned: 0.05,
      //     confused: 0,
      //     sad: 0,
      //     angry: 0,
      //     fear: 0,
      //   },
      //   posture_analysis: {
      //     craniovertebral_angle_score: 85,
      //     shoulder_tilt_score: 90,
      //     shoulder_symmetry_score: 92,
      //     shoulder_position_score: 88,
      //     overall_posture_score: 88,
      //   },
      //   engagement_patterns: {
      //     segments: [
      //       { time: 0, emotions: {}, engagement: 75 },
      //       { time: 30, emotions: {}, engagement: 85 },
      //       { time: 60, emotions: {}, engagement: 90 },
      //       { time: 90, emotions: {}, engagement: 95 },
      //       { time: 120, emotions: {}, engagement: 90 },
      //     ],
      //     overall_engagement: 87,
      //     engagement_stability: 92,
      //   },
      //   assessment: {
      //     rating: "Excellent",
      //     total_score: 89.6,
      //     detailed_scores: {
      //       attention: 90,
      //       posture: 88,
      //       emotion: 85,
      //       engagement: 87,
      //     },
      //     feedback: [
      //       "Excellent eye contact maintained throughout the presentation",
      //       "Good posture with minimal swaying or fidgeting",
      //       "Consistent engagement level with appropriate emotional expressions",
      //     ],
      //     improvements: [
      //       "Try to vary your emotional expressions more for emphasis",
      //       "Occasionally your shoulders tensed during technical explanations",
      //     ],
      //     metrics: {
      //       engagement_level: 100,
      //       expression_variety: 50,
      //       professionalism_score: 85,
      //       posture_quality: 88,
      //     },
      //   },
      // }
      console.log("Video analysis results:", data);
      setAnalysisResults(data);
    } catch (error) {
      console.error("Error analyzing video:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Copy feedback to clipboard
  const copyFeedback = () => {
    if (!analysisResults) return;

    const feedback = `
Video Analysis Report
Overall Rating: ${analysisResults.assessment.rating}

Scores:
- Attention: ${analysisResults.assessment.detailed_scores.attention}/100
- Posture: ${analysisResults.assessment.detailed_scores.posture}/100
- Emotion: ${analysisResults.assessment.detailed_scores.emotion}/100
- Engagement: ${analysisResults.assessment.detailed_scores.engagement}/100

Positive Points:
${analysisResults.assessment.feedback.map((point) => `✅ ${point}`).join("\n")}

Areas for Improvement:
${analysisResults.assessment.improvements
  .map((point) => `🔧 ${point}`)
  .join("\n")}
    `;

    navigator.clipboard.writeText(feedback);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get badge color class
  const getBadgeColorClass = (score) => {
    if (score >= 80)
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    if (score >= 60)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Format emotion data for display (convert from decimal to percentage)
  const formatEmotionData = (emotionData) => {
    const result = {};
    Object.entries(emotionData).forEach(([key, value]) => {
      result[key] = Math.round(value * 100);
    });
    return result;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Header */}
            <motion.div className="text-center mb-10" variants={itemVariants}>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Video Analysis
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Analyze your public speaking skills using AI-powered video
                feedback
              </p>
            </motion.div>

            {/* Input Options */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8"
              variants={itemVariants}
            >
              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === "upload"
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  onClick={() => setActiveTab("upload")}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Upload size={18} />
                    <span>Upload Video</span>
                  </div>
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === "record"
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  onClick={() => setActiveTab("record")}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Camera size={18} />
                    <span>Record Video</span>
                  </div>
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "upload" ? (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center mb-4">
                        <p className="text-gray-600 dark:text-gray-300">
                          Upload a video file (.mp4, .webm, or .mov) to analyze
                          your presentation
                        </p>
                      </div>

                      {/* File Upload Area */}
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                          isDragActive
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600"
                        }`}
                      >
                        <input {...getInputProps()} />
                        <Upload
                          size={36}
                          className="mx-auto mb-4 text-gray-400 dark:text-gray-500"
                        />
                        {isDragActive ? (
                          <p className="text-blue-600 dark:text-blue-400 font-medium">
                            Drop the video file here...
                          </p>
                        ) : (
                          <div>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                              Drag & drop a video file here, or click to select
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                              Supports .mp4, .webm, and .mov files
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="record"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center mb-4">
                        <p className="text-gray-600 dark:text-gray-300">
                          Record yourself using your webcam to analyze your
                          presentation
                        </p>
                      </div>

                      {/* Video Preview */}
                      <div className="bg-black rounded-lg overflow-hidden aspect-video mb-4 relative">
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
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

                      {/* Recording Controls */}
                      <div className="flex justify-center">
                        {!isRecording ? (
                          <button
                            onClick={startRecording}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-all"
                          >
                            <Camera size={20} />
                            Start Recording
                          </button>
                        ) : (
                          <button
                            onClick={stopRecording}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-lg transition-all"
                          >
                            <span className="relative flex h-3 w-3 mr-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            Stop Recording
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Video Preview (if video is available) */}
            {videoUrl && !isRecording && !isAnalyzing && (
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Video Preview
                </h3>
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  <video
                    src={videoUrl}
                    className="w-full h-full object-contain"
                    controls
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={analyzeVideo}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-all"
                  >
                    <BarChart2 size={20} />
                    Analyze Video
                  </button>
                </div>
              </motion.div>
            )}

            {/* Loading/Analyzing State */}
            {isAnalyzing && (
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 mb-6">
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-900/30"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    ></motion.div>
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    ></motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader
                        size={32}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Analyzing Your Video
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md">
                    Our AI is processing your video to provide detailed insights
                    on your public speaking skills. This may take a moment...
                  </p>
                </div>

                {/* Animated Processing Indicator */}
                <div className="mt-8 flex justify-center items-center h-12 gap-1">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-blue-500 dark:bg-blue-600 rounded-full"
                      animate={{
                        height: [12, 24 + Math.random() * 24, 12],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                      }}
                    ></motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Analysis Results */}
            {analysisResults && !isAnalyzing && (
              <motion.div
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                  variants={itemVariants}
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Video Analysis Report
                  </h2>

                  {/* Presentation Metrics Section */}
                  <div className="mb-8">
                    <div
                      className="flex items-center justify-between cursor-pointer mb-4"
                      onClick={() => toggleSection("metrics")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <BarChart2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Presentation Metrics
                        </h3>
                      </div>
                      {expandedSections.metrics ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>

                    {expandedSections.metrics && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Duration
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {Math.floor(
                              analysisResults.presentation_metrics.duration / 60
                            )}
                            m{" "}
                            {Math.round(
                              analysisResults.presentation_metrics.duration % 60
                            )}
                            s
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Frames Analyzed
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {analysisResults.presentation_metrics.frames_analyzed.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Analysis Quality
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {analysisResults.presentation_metrics.analysis_quality.toFixed(
                              1
                            )}
                            %
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Attention & Eye Contact Section */}
                  <div className="mb-8">
                    <div
                      className="flex items-center justify-between cursor-pointer mb-4"
                      onClick={() => toggleSection("attention")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Attention & Eye Contact
                        </h3>
                      </div>
                      {expandedSections.attention ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>

                    {expandedSections.attention && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <div className="flex flex-col">
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                Looking at Screen
                              </p>
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {
                                  analysisResults.eye_contact_analysis
                                    .looking_at_screen
                                }
                                s
                              </p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                Looking Away
                              </p>
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {
                                  analysisResults.eye_contact_analysis
                                    .not_looking_at_screen
                                }
                                s
                              </p>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                              Attention Score
                            </p>
                            <div className="flex items-center">
                              <p className="text-3xl font-bold text-gray-900 dark:text-white mr-2">
                                {
                                  analysisResults.eye_contact_analysis
                                    .attention_percentage
                                }
                                %
                              </p>
                              <div className="flex-grow h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500 dark:bg-green-600 rounded-full"
                                  style={{
                                    width: `${analysisResults.eye_contact_analysis.attention_percentage}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center justify-center">
                          {/* Pie Chart Visualization */}
                          <div className="relative w-40 h-40">
                            <svg viewBox="0 0 36 36" className="w-full h-full">
                              {/* Background Circle */}
                              <path
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="3"
                                className="dark:stroke-gray-700"
                              />

                              {/* Looking at Screen */}
                              <path
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#10B981"
                                strokeWidth="3"
                                strokeDasharray={`${analysisResults.eye_contact_analysis.attention_percentage}, 100`}
                                className="dark:stroke-green-500"
                              />

                              {/* Percentage Text */}
                              <text
                                x="18"
                                y="18"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-gray-900 dark:fill-white font-bold text-[0.5rem]"
                                fontSize="0.5rem"
                              >
                                {
                                  analysisResults.eye_contact_analysis
                                    .attention_percentage
                                }
                                %
                              </text>

                              <text
                                x="18"
                                y="22"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-gray-500 dark:fill-gray-400 text-[0.3rem]"
                                fontSize="0.3rem"
                              >
                                Eye Contact
                              </text>
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Emotion Breakdown Section */}
                  <div className="mb-8">
                    <div
                      className="flex items-center justify-between cursor-pointer mb-4"
                      onClick={() => toggleSection("emotion")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Smile className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Emotion Breakdown
                        </h3>
                      </div>
                      {expandedSections.emotion ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>

                    {expandedSections.emotion && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        {/* Horizontal Bar Chart */}
                        <div className="space-y-4">
                          {Object.entries(
                            formatEmotionData(analysisResults.emotion_analysis)
                          )
                            .filter(([_, value]) => value > 0)
                            .sort(([_, a], [__, b]) => b - a)
                            .map(([emotion, percentage]) => (
                              <div key={emotion} className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                    {emotion}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {percentage}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                  <div
                                    className="h-2.5 rounded-full"
                                    style={{
                                      width: `${percentage}%`,
                                      backgroundColor:
                                        emotion === "happy"
                                          ? "#10B981"
                                          : emotion === "neutral"
                                          ? "#6B7280"
                                          : emotion === "enthusiastic"
                                          ? "#3B82F6"
                                          : emotion === "concerned"
                                          ? "#F59E0B"
                                          : emotion === "confused"
                                          ? "#8B5CF6"
                                          : emotion === "sad"
                                          ? "#6366F1"
                                          : emotion === "angry"
                                          ? "#EF4444"
                                          : emotion === "fear"
                                          ? "#EC4899"
                                          : "#9CA3AF",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                        </div>

                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                          <p>
                            Your presentation shows a good mix of emotions, with
                            a predominant{" "}
                            {
                              Object.entries(
                                formatEmotionData(
                                  analysisResults.emotion_analysis
                                )
                              ).sort(([_, a], [__, b]) => b - a)[0][0]
                            }{" "}
                            tone.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Posture Evaluation Section */}
                  <div className="mb-8">
                    <div
                      className="flex items-center justify-between cursor-pointer mb-4"
                      onClick={() => toggleSection("posture")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Posture Evaluation
                        </h3>
                      </div>
                      {expandedSections.posture ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>

                    {expandedSections.posture && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <div className="space-y-6">
                          {/* CVA Score */}
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                CVA Score
                              </span>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {
                                  analysisResults.posture_analysis
                                    .craniovertebral_angle_score
                                }
                                /100
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                              <div
                                className="h-4 rounded-full bg-blue-600 dark:bg-blue-500"
                                style={{
                                  width: `${analysisResults.posture_analysis.craniovertebral_angle_score}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Shoulder Tilt */}
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Shoulder Tilt
                              </span>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {
                                  analysisResults.posture_analysis
                                    .shoulder_tilt_score
                                }
                                /100
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                              <div
                                className="h-4 rounded-full bg-green-600 dark:bg-green-500"
                                style={{
                                  width: `${analysisResults.posture_analysis.shoulder_tilt_score}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Shoulder Symmetry */}
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Shoulder Symmetry
                              </span>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {
                                  analysisResults.posture_analysis
                                    .shoulder_symmetry_score
                                }
                                /100
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                              <div
                                className="h-4 rounded-full bg-purple-600 dark:bg-purple-500"
                                style={{
                                  width: `${analysisResults.posture_analysis.shoulder_symmetry_score}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Overall Posture */}
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Overall Posture
                              </span>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {
                                  analysisResults.posture_analysis
                                    .overall_posture_score
                                }
                                /100
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                              <div
                                className="h-4 rounded-full bg-amber-600 dark:bg-amber-500"
                                style={{
                                  width: `${analysisResults.posture_analysis.overall_posture_score}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Engagement Patterns Section */}
                  <div className="mb-8">
                    <div
                      className="flex items-center justify-between cursor-pointer mb-4"
                      onClick={() => toggleSection("engagement")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                          <PieChart className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Engagement Patterns
                        </h3>
                      </div>
                      {expandedSections.engagement ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>

                    {expandedSections.engagement && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                              Overall Engagement
                            </p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {
                                analysisResults.engagement_patterns
                                  .overall_engagement
                              }
                              /100
                            </p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                              Stability
                            </p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {
                                analysisResults.engagement_patterns
                                  .engagement_stability
                              }
                              /100
                            </p>
                          </div>
                        </div>

                        {/* Engagement Over Time Graph */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                            Engagement Over Time
                          </h4>
                          <div className="h-40 w-full">
                            <div className="relative h-full w-full">
                              {/* Y-axis labels */}
                              <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span>100%</span>
                                <span>75%</span>
                                <span>50%</span>
                                <span>25%</span>
                                <span>0%</span>
                              </div>

                              {/* Graph area */}
                              <div className="absolute left-8 right-0 top-0 bottom-0 border-l border-b border-gray-300 dark:border-gray-600">
                                {/* Horizontal grid lines */}
                                <div className="absolute left-0 right-0 top-0 h-px bg-gray-300 dark:bg-gray-600"></div>
                                <div className="absolute left-0 right-0 top-1/4 h-px bg-gray-300 dark:bg-gray-600"></div>
                                <div className="absolute left-0 right-0 top-2/4 h-px bg-gray-300 dark:bg-gray-600"></div>
                                <div className="absolute left-0 right-0 top-3/4 h-px bg-gray-300 dark:bg-gray-600"></div>

                                {/* Line chart */}
                                <svg className="absolute inset-0 h-full w-full overflow-visible">
                                  <defs>
                                    <linearGradient
                                      id="engagement-gradient"
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="0%"
                                        stopColor="#3B82F6"
                                        stopOpacity="0.2"
                                      />
                                      <stop
                                        offset="100%"
                                        stopColor="#3B82F6"
                                        stopOpacity="0"
                                      />
                                    </linearGradient>
                                  </defs>

                                  <path
                                    d={`
                                      M ${analysisResults.engagement_patterns.segments
                                        .map(
                                          (point, i, arr) =>
                                            `${(
                                              (i / (arr.length - 1)) *
                                              100
                                            ).toFixed(2)} ${(
                                              100 -
                                              point.engagement * 100
                                            ).toFixed(2)}`
                                        )
                                        .join(" L ")}
                                      L 100 100 L 0 100 Z
                                    `}
                                    fill="url(#engagement-gradient)"
                                  />

                                  <path
                                    d={`
                                      M ${analysisResults.engagement_patterns.segments
                                        .map(
                                          (point, i, arr) =>
                                            `${(
                                              (i / (arr.length - 1)) *
                                              100
                                            ).toFixed(2)} ${(
                                              100 -
                                              point.engagement * 100
                                            ).toFixed(2)}`
                                        )
                                        .join(" L ")}
                                    `}
                                    fill="none"
                                    stroke="#3B82F6"
                                    strokeWidth="2"
                                    className="dark:stroke-blue-400"
                                  />

                                  {/* Data points */}
                                  {analysisResults.engagement_patterns.segments.map(
                                    (point, i, arr) => (
                                      <circle
                                        key={i}
                                        cx={`${(i / (arr.length - 1)) * 100}%`}
                                        cy={`${100 - point.engagement}%`}
                                        r="3"
                                        fill="#3B82F6"
                                        className="dark:fill-blue-400"
                                      />
                                    )
                                  )}
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* X-axis labels */}
                          <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400 pl-8">
                            {analysisResults.engagement_patterns.segments.map(
                              (point, i) => (
                                <span key={i}>{point.time}s</span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Feedback Card */}
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-t-4 border-blue-600 dark:border-blue-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Overall Assessment
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm font-medium">
                        {analysisResults.assessment.rating}
                      </span>
                    </div>

                    {/* Individual Scores */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Attention
                        </p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          {analysisResults.assessment.detailed_scores.attention}
                          /100
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Posture
                        </p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          {analysisResults.assessment.detailed_scores.posture}
                          /100
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Emotion
                        </p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          {analysisResults.assessment.detailed_scores.emotion}
                          /100
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Engagement
                        </p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          {
                            analysisResults.assessment.detailed_scores
                              .engagement
                          }
                          /100
                        </p>
                      </div>
                    </div>

                    {/* Feedback Points */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Positive Feedback */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-2" />
                          Positive Points
                        </h4>
                        <ul className="space-y-2">
                          {analysisResults.assessment.feedback.map(
                            (point, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-700 dark:text-gray-300">
                                  {point}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Improvement Areas */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <AlertCircle className="w-5 h-5 text-amber-500 mr-2" />
                          Suggested Improvements
                        </h4>
                        <ul className="space-y-2">
                          {analysisResults.assessment.improvements.map(
                            (point, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-amber-500 mr-2">🔧</span>
                                <span className="text-gray-700 dark:text-gray-300">
                                  {point}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Performance Badges */}
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Award className="w-5 h-5 text-blue-500 mr-2" />
                        Performance Metrics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(analysisResults.assessment.metrics).map(
                          ([key, value], index) => (
                            <span
                              key={index}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColorClass(
                                typeof value === "number" ? value : 75
                              )}`}
                            >
                              {key.replace(/_/g, " ")}:{" "}
                              {typeof value === "number" ? `${value}%` : value}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Copy Feedback Button */}
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={copyFeedback}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check size={16} className="text-green-500" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            <span>Copy Feedback</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VideoAnalysis;
