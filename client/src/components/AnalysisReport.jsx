"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Clock, Eye, BarChart, Activity, LineChart } from "lucide-react"
import { Pie, Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const AnalysisReport = ({ results }) => {
  // Prepare attention data for pie chart
  const attentionData = {
    labels: ["Looking at Screen", "Looking Away"],
    datasets: [
      {
        data: [results.attention_eye_contact.looking_at_screen, results.attention_eye_contact.looking_away],
        backgroundColor: ["rgba(59, 130, 246, 0.8)", "rgba(209, 213, 219, 0.8)"],
        borderColor: ["rgba(59, 130, 246, 1)", "rgba(209, 213, 219, 1)"],
        borderWidth: 1,
      },
    ],
  }

  // Prepare emotion data for horizontal bar chart
  const emotionData = {
    labels: Object.keys(results.emotion_breakdown).map((key) => key.charAt(0).toUpperCase() + key.slice(1)),
    datasets: [
      {
        label: "Percentage",
        data: Object.values(results.emotion_breakdown),
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)", // happy
          "rgba(107, 114, 128, 0.8)", // neutral
          "rgba(245, 158, 11, 0.8)", // enthusiastic
          "rgba(249, 115, 22, 0.8)", // concerned
          "rgba(139, 92, 246, 0.8)", // confused
          "rgba(59, 130, 246, 0.8)", // sad
          "rgba(239, 68, 68, 0.8)", // angry
          "rgba(99, 102, 241, 0.8)", // fear
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(107, 114, 128, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(99, 102, 241, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  // Prepare engagement data for line chart
  const engagementData = {
    labels: results.engagement_patterns.time_series.map((point) => `${point.time}s`),
    datasets: [
      {
        label: "Engagement",
        data: results.engagement_patterns.time_series.map((point) => point.engagement),
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        tension: 0.4,
      },
    ],
  }

  // Chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  }

  const barOptions = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  }

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  }

  // Get badge color
  const getBadgeColor = (color) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "blue":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "yellow":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "red":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="space-y-8" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Video Analysis Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Presentation Metrics */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Presentation Metrics
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Duration</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {Math.floor(results.presentation_metrics.duration / 60)}m{" "}
                      {Math.round(results.presentation_metrics.duration % 60)}s
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Frames Analyzed</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {results.presentation_metrics.frames_analyzed.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Analysis Quality</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                      {results.presentation_metrics.analysis_quality}
                    </p>
                  </div>
                </div>
              </div>

              {/* Feedback Card */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">{results.feedback.rating}</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Attention</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {results.feedback.scores.attention}/100
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Posture</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {results.feedback.scores.posture}/100
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Emotion</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {results.feedback.scores.emotion}/100
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Engagement</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {results.feedback.scores.engagement}/100
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {results.feedback.badges.map((badge, index) => (
                    <Badge key={index} className={getBadgeColor(badge.color)}>
                      {badge.label}: {badge.value}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Attention & Eye Contact */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              Attention & Eye Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64">
                <Pie data={attentionData} options={pieOptions} />
              </div>
              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Looking at Screen</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {results.attention_eye_contact.looking_at_screen.toFixed(1)}s
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ({results.attention_eye_contact.attention_percentage}%)
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Looking Away</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {results.attention_eye_contact.looking_away.toFixed(1)}s
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ({(100 - results.attention_eye_contact.attention_percentage).toFixed(0)}%)
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-800 dark:text-blue-300">
                    {results.attention_eye_contact.attention_percentage >= 80
                      ? "Excellent eye contact maintained throughout your presentation."
                      : results.attention_eye_contact.attention_percentage >= 60
                        ? "Good eye contact, but try to maintain it more consistently."
                        : "Try to improve your eye contact for better audience engagement."}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Emotion Breakdown */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-500" />
              Emotion Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar data={emotionData} options={barOptions} />
            </div>
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-300">
                {results.emotion_breakdown.happy + results.emotion_breakdown.enthusiastic > 50
                  ? "Your positive emotions dominate your presentation, creating an engaging atmosphere."
                  : results.emotion_breakdown.neutral > 70
                    ? "Your presentation is mostly neutral. Consider adding more emotional variety for engagement."
                    : "Your emotional expression is varied, which can help keep your audience engaged."}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Posture Evaluation */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Posture Evaluation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">CVA Score</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{results.posture_evaluation.cva_score}/100</p>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${results.posture_evaluation.cva_score}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Shoulder Symmetry</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {results.posture_evaluation.shoulder_symmetry}/100
                  </p>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 rounded-full"
                    style={{ width: `${results.posture_evaluation.shoulder_symmetry}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Posture Quality</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {results.posture_evaluation.posture_quality}/100
                  </p>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${results.posture_evaluation.posture_quality}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Head Position</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                    {results.posture_evaluation.head_position}
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-800 dark:text-blue-300">
                    {results.posture_evaluation.posture_quality >= 85
                      ? "Your posture is excellent, projecting confidence and authority."
                      : results.posture_evaluation.posture_quality >= 70
                        ? "Your posture is good, but could be improved for better presence."
                        : "Focus on improving your posture to appear more confident and engaged."}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Engagement Patterns */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-blue-500" />
              Engagement Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-6">
              <Line data={engagementData} options={lineOptions} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Overall Engagement</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {results.engagement_patterns.overall_engagement}/100
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Stability</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {results.engagement_patterns.stability}/100
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Feedback Details */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Detailed Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5" />
                  Positive Points
                </h3>
                <ul className="space-y-2">
                  {results.feedback.positive_points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5" />
                  Suggested Improvements
                </h3>
                <ul className="space-y-2">
                  {results.feedback.improvements.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default AnalysisReport
