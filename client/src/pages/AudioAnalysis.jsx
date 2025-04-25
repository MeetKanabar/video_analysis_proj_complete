"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactMic } from "react-mic";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Mic,
  Upload,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Clock,
  Volume2,
  TrendingUp,
  Smile,
  FileText,
  Award,
  Loader,
} from "lucide-react";
import { useDropzone } from "react-dropzone";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AudioAnalysis = () => {
  // State management
  const [activeTab, setActiveTab] = useState("record"); // "record" or "upload"
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    transcription: true,
    speed: true,
    pauses: true,
    energy: true,
    pitch: true,
    emotion: true,
    paraphrased: true,
  });
  const audioRef = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current && audioRef.current.duration) {
        const percent =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(percent);
      }
      requestRef.current = requestAnimationFrame(updateProgress);
    };

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(updateProgress);
    } else {
      cancelAnimationFrame(requestRef.current);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying]);

  // Handle file upload
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setAudioUrl(fileUrl);
      setAudioBlob(file);
      analyzeAudio(file);
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "audio/wav": [".wav"],
      "audio/mpeg": [".mp3"],
    },
    maxFiles: 1,
  });

  // Start recording
  const startRecording = () => setRecording(true);

  // Stop recording
  const stopRecording = () => setRecording(false);

  // Handle recording stop
  const onRecordingStop = (recordedBlob) => {
    setAudioUrl(recordedBlob.blobURL);
    setAudioBlob(recordedBlob.blob);
    analyzeAudio(recordedBlob.blob);
  };

  // Toggle audio playback
  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle audio playback ended
  const handlePlaybackEnded = () => {
    setIsPlaying(false);
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Analyze audio
  const analyzeAudio = async (blob) => {
    setIsAnalyzing(true);
    setAnalysisResults(null);

    const formData = new FormData();
    formData.append("audio", blob, "recording.wav");

    try {
      // Step 1: Call /audio-analysis endpoint
      const audioAnalysisResponse = await fetch(
        "http://localhost:5000/audio-analysis",
        {
          method: "POST",
          body: formData,
        }
      );
      console.log("Audio Analysis Response:", audioAnalysisResponse);
      if (!audioAnalysisResponse.ok) {
        throw new Error(
          `Audio Analysis API error: ${audioAnalysisResponse.statusText}`
        );
      }

      const audioAnalysisResults = await audioAnalysisResponse.json();

      // Step 2: Call /predict endpoint for emotion data
      const emotionResponse = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!emotionResponse.ok) {
        throw new Error(
          `Emotion Prediction API error: ${emotionResponse.statusText}`
        );
      }

      const emotionData = await emotionResponse.json();

      // Step 3: Merge results
      const finalResults = {
        ...audioAnalysisResults,
        emotion: emotionData,
      };

      // Step 4: Set the merged results
      setAnalysisResults(finalResults);
      //print after 2 secs the results
      setTimeout(() => {
        console.log("Final Analysis Results:", finalResults);
      }, 2000);
    } catch (error) {
      console.error("Error analyzing audio:", error);
      // Handle error state
      setAnalysisResults({
        error: "Failed to analyze audio. Please try again later.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Highlight filler words in transcription
  const highlightFillerWords = (text, fillerWords) => {
    if (!text || !fillerWords) return text;

    // Convert fillerWords object to an array of keys if it's not already an array
    const fillerWordsArray = Array.isArray(fillerWords)
      ? fillerWords
      : Object.keys(fillerWords);

    let highlightedText = text;
    fillerWordsArray.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        `<span class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$&</span>`
      );
    });
    return highlightedText;
  };

  // Get score color based on value
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500 dark:text-green-400";
    if (score >= 60) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  // Get energy level color
  const getEnergyColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "moderate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "low":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Prepare pitch and volume chart data
  const getPitchChartData = () => {
    if (!analysisResults?.pitch?.data) return null;

    return {
      labels: analysisResults.pitch.data.map((point) => `${point.time}s`),
      datasets: [
        {
          label: "Pitch (Hz)",
          data: analysisResults.pitch.data.map((point) => point.pitch),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
          fill: false,
          yAxisID: "y",
        },
        {
          label: "Volume (dB)",
          data: analysisResults.pitch.data.map((point) => point.volume),
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          tension: 0.4,
          fill: false,
          yAxisID: "y1",
        },
      ],
    };
  };

  const pitchChartOptions = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Pitch (Hz)",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Volume (dB)",
        },
      },
    },
  };
  // Prepare emotion chart data
  // Mapping emotion to simplified scores
  const mapEmotionScore = (emotion) => {
    if (["happy", "surprise"].includes(emotion.toLowerCase())) return 1;
    if (["angry", "sad", "fear", "disgust"].includes(emotion.toLowerCase()))
      return -1;
    return 0;
  };

  // Build chart data from emotion.emotion.data
  const getEmotionChartData = () => {
    const emotionData = analysisResults.emotion.emotion.data;

    return {
      labels: emotionData.map((point) => `${point.time}s`),
      datasets: [
        {
          label: "Emotion Polarity",
          data: emotionData.map((point) => mapEmotionScore(point.emotion)),
          borderColor: "#22c55e",
          backgroundColor: "rgba(34,197,94,0.2)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
        },
      ],
    };
  };

  const emotionChartOptions = {
    responsive: true,
    scales: {
      y: {
        min: -1,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: (val) => {
            if (val === 1) return "Positive";
            if (val === 0) return "Neutral";
            if (val === -1) return "Negative";
            return "";
          },
        },
        title: {
          display: true,
          text: "Emotion",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time (s)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const raw = analysisResults.emotion.emotion.data[ctx.dataIndex];
            return `Time: ${raw.time}s — Emotion: ${raw.emotion}`;
          },
        },
      },
      legend: {
        display: true,
      },
    },
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

  const tabVariants = {
    inactive: { opacity: 0.7 },
    active: { opacity: 1 },
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
                Audio Analysis
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Analyze your speaking skills using AI-powered feedback
              </p>
            </motion.div>

            {/* Input Options */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8"
              variants={itemVariants}
            >
              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <motion.button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === "record"
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  onClick={() => setActiveTab("record")}
                  variants={tabVariants}
                  animate={activeTab === "record" ? "active" : "inactive"}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Mic size={18} />
                    <span>Record Audio</span>
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
                    <span>Upload Audio</span>
                  </div>
                </motion.button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "record" ? (
                    <motion.div
                      key="record"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center mb-4">
                        <p className="text-gray-600 dark:text-gray-300">
                          Click the button below to start recording your speech
                        </p>
                      </div>

                      {/* Recording Visualizer */}
                      <div className="bg-black p-4 rounded-lg mb-6 relative overflow-hidden">
                        <ReactMic
                          record={recording}
                          className="w-full h-32"
                          onStop={onRecordingStop}
                          strokeColor="#3B82F6"
                          backgroundColor="#000000"
                        />

                        {/* Recording Indicator */}
                        {recording && (
                          <div className="absolute top-2 right-2 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
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
                        {!recording ? (
                          <motion.button
                            onClick={startRecording}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-lg transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Mic size={20} />
                            Start Recording
                          </motion.button>
                        ) : (
                          <motion.button
                            onClick={stopRecording}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full shadow-lg transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="relative flex h-3 w-3 mr-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            Stop Recording
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center mb-4">
                        <p className="text-gray-600 dark:text-gray-300">
                          Upload an audio file (.mp3 or .wav) to analyze
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
                            Drop the audio file here...
                          </p>
                        ) : (
                          <div>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                              Drag & drop an audio file here, or click to select
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                              Supports .mp3 and .wav files
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Audio Player (if audio is available) */}
            {audioUrl && !isAnalyzing && (
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlayback}
                    className={`w-12 h-12 flex items-center justify-center rounded-full ${
                      isPlaying
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                      Your Recording
                    </h3>
                    <audio
                      ref={audioRef}
                      src={audioUrl}
                      className="w-full"
                      controls={false}
                      onEnded={handlePlaybackEnded}
                    />
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${progress}%`,
                        }}
                      ></div>
                    </div>
                  </div>
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
                    Analyzing Your Speech
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md">
                    Our AI is processing your audio to provide detailed insights
                    on your speaking skills. This may take a moment...
                  </p>
                </div>

                {/* Animated Waveform */}
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
                {/* Overall Score */}
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                  variants={itemVariants}
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <svg viewBox="0 0 36 36" className="w-full h-full">
                        <path
                          className="stroke-current text-gray-200 dark:text-gray-700"
                          fill="none"
                          strokeWidth="3"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={`stroke-current ${
                            analysisResults.section_feedback.overallScore >= 80
                              ? "text-green-500"
                              : analysisResults.section_feedback.overallScore >= 60
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                          fill="none"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={`${analysisResults.section_feedback.overallScore}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text
                          x="18"
                          y="23.35"
                          className="fill-current text-gray-800 dark:text-gray-200 font-bold text-small"
                          textAnchor="middle"
                        >
                          {analysisResults.section_feedback.overallScore}
                        </text>
                      </svg>
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Overall Assessment
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-3 justify-center md:justify-start">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
                          Clarity
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 rounded-full text-sm font-medium">
                          Pacing
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-medium">
                          Energy
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-full text-sm font-medium">
                          Emotion
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {analysisResults.section_feedback.overallFeedback}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Transcription Section */}
                {/* Transcription Section */}
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  variants={itemVariants}
                >
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer"
                    onClick={() => toggleSection("transcription")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Transcription
                      </h3>
                    </div>
                    {expandedSections.transcription ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  {expandedSections.transcription && (
                    <div className="px-6 pb-6">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p
                          className="text-gray-700 dark:text-gray-300"
                          dangerouslySetInnerHTML={{
                            __html: highlightFillerWords(
                              analysisResults.transcription.text,
                              analysisResults.transcription.fillerWords
                            ),
                          }}
                        ></p>
                      </div>
                      <div className="mt-4 flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Filler words are highlighted in yellow. Try to reduce
                          these in your speech for clearer communication.
                        </p>
                      </div>
                      {/* Add Feedback */}
                      <div className="mt-4">
                        <p className="text-gray-700 dark:text-gray-300">
                          💡Smart Suggestion :{" "}
                          {
                            analysisResults.section_feedback
                              .transcription_feedback
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Speech Speed Section */}
                {/* Speech Speed Section */}
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  variants={itemVariants}
                >
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer"
                    onClick={() => toggleSection("speed")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Speech Speed
                      </h3>
                    </div>
                    {expandedSections.speed ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  {expandedSections.speed && (
                    <div className="px-6 pb-6">
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Slow
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Ideal
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Fast
                          </span>
                        </div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              analysisResults.speed.wpm < 120
                                ? "bg-yellow-500"
                                : analysisResults.speed.wpm <= 180
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(
                                  0,
                                  ((analysisResults.speed.wpm - 100) / 100) *
                                    100
                                )
                              )}%`,
                            }}
                          ></div>
                        </div>

                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            100 WPM
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            150 WPM
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            200 WPM
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-700 dark:text-gray-300">
                          Your speaking rate:
                        </span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {analysisResults.speed.wpm} WPM
                        </span>
                      </div>

                      {/* Add Feedback */}
                      <div className="mt-4">
                        <p className="text-gray-700 dark:text-gray-300">
                          💡Smart Suggestion :{" "}
                          {analysisResults.section_feedback.speed_feedback}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Pauses Section */}
                {/* Pauses Section */}
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  variants={itemVariants}
                >
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer"
                    onClick={() => toggleSection("pauses")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Pause Analysis
                      </h3>
                    </div>
                    {expandedSections.pauses ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  {expandedSections.pauses && (
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Total Pauses
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {analysisResults.pauses.count}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Short Pauses
                          </p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {analysisResults.pauses.shortPauses}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Long Pauses
                          </p>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {analysisResults.pauses.longPauses}
                          </p>
                        </div>
                      </div>

                      {/* Add Feedback */}
                      <div className="mt-4">
                        <p className="text-gray-700 dark:text-gray-300">
                          💡Smart Suggestion :{" "}
                          {analysisResults.section_feedback.pause_feedback}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Energy Level Section */}
                {/* Energy Level Section */}
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  variants={itemVariants}
                >
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer"
                    onClick={() => toggleSection("energy")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                        <Volume2 className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Energy Level
                      </h3>
                    </div>
                    {expandedSections.energy ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  {expandedSections.energy && (
                    <div className="px-6 pb-6">
                      {/* Energy Level */}
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-gray-700 dark:text-gray-300">
                          Energy level:
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getEnergyColor(
                            analysisResults.energy.level
                          )}`}
                        >
                          {analysisResults.energy.level
                            .charAt(0)
                            .toUpperCase() +
                            analysisResults.energy.level.slice(1)}
                        </span>
                      </div>

                      {/* Energy Variation */}
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-gray-700 dark:text-gray-300">
                          Energy variation:
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            analysisResults.energy.variation === "high"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : analysisResults.energy.variation === "medium"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {analysisResults.energy.variation
                            .charAt(0)
                            .toUpperCase() +
                            analysisResults.energy.variation.slice(1)}
                        </span>
                      </div>

                      {/* Average RMS */}
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-gray-700 dark:text-gray-300">
                          Average RMS:
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                          {analysisResults.energy.averageRMS}
                        </span>
                      </div>

                      {/* Add Feedback */}
                      <div className="mt-4">
                        <p className="text-gray-700 dark:text-gray-300">
                          💡Smart Suggestion :{" "}
                          {analysisResults.section_feedback.energy_feedback}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Pitch & Loudness Section */}
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  variants={itemVariants}
                >
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer"
                    onClick={() => toggleSection("pitch")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Pitch & Loudness
                      </h3>
                    </div>
                    {expandedSections.pitch ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  {expandedSections.pitch && (
                    <div className="px-6 pb-6">
                      <div className="mb-6 bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                        {getPitchChartData() && (
                          <Line
                            data={getPitchChartData()}
                            options={pitchChartOptions}
                          />
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            🎯 Average Pitch
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {analysisResults.pitch.average} Hz
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            🎭 Pitch Variation
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            ±{analysisResults.pitch.variation} Hz
                          </p>
                        </div>
                      </div>

                      {/* Add Section Feedback */}
                      <div className="mt-4">
                        <p className="text-gray-700 dark:text-gray-300">
                          💡Smart Suggestion :{" "}
                          {analysisResults.section_feedback.pitch_feedback}
                        </p>
                      </div>

                      {/* ℹ️ Info (optional) */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                        <p>
                          <strong>Tip:</strong> A higher average pitch can sound
                          more enthusiastic, while good pitch variation keeps
                          your voice engaging. The graph above shows how your
                          pitch changed over time.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Emotion Detection Section */}
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  variants={itemVariants}
                >
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer"
                    onClick={() => toggleSection("emotion")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                        <Smile className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Emotion Detection
                      </h3>
                    </div>
                    {expandedSections.emotion ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  {expandedSections.emotion && (
                    <div className="px-6 pb-6">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        Emotion Timeline
                      </h2>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                        <Line
                          data={getEmotionChartData()}
                          options={emotionChartOptions}
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                          This chart maps your emotions across time. Higher
                          values represent positive emotions (e.g., happy,
                          surprise), lower values indicate negative emotions
                          (e.g., angry, sad). Aim for variation but avoid
                          prolonged negativity unless intentional.
                        </p>
                      </div>
                      
                      {/* Add Feedback */}
                      <div className="mt-4">
                        <p className="text-gray-700 dark:text-gray-300">
                          💡Smart Suggestion :{" "}
                          {analysisResults.section_feedback.emotion_feedback}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Paraphrased Version Section */}
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  variants={itemVariants}
                >
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer"
                    onClick={() => toggleSection("paraphrased")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Paraphrased Version
                      </h3>
                    </div>
                    {expandedSections.paraphrased ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  {expandedSections.paraphrased && (
                    <div className="px-6 pb-6">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        {analysisResults?.paraphrased?.options?.length > 0 ? (
                          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                            {analysisResults.paraphrased.options.map(
                              (option, index) => (
                                <li key={index} className="mb-2 italic">
                                  {option}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300 italic">
                            No paraphrased options available.
                          </p>
                        )}
                      </div>
                      <div className="mt-4 flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          These are alternative ways to express your speech with
                          improved clarity and structure.
                        </p>
                      </div>
                    </div>
                  )}
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

export default AudioAnalysis;
