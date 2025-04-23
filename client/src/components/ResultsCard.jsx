"use client"

import { motion } from "framer-motion"
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js"
import { Radar, Bar } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const ResultsCard = ({
  title,
  score,
  feedback,
  strengths,
  improvements,
  chartData,
  chartType,
  color = "blue",
  delay = 0,
  issuesList,
  fillerWords,
  repeatedWords,
  metrics,
}) => {
  const [expanded, setExpanded] = useState(true)

  // Get color based on score
  const getScoreColor = () => {
    if (score >= 90) return "text-green-500 dark:text-green-400"
    if (score >= 70) return "text-blue-500 dark:text-blue-400"
    if (score >= 50) return "text-yellow-500 dark:text-yellow-400"
    return "text-red-500 dark:text-red-400"
  }

  // Get color based on category
  const getCategoryColor = () => {
    switch (color) {
      case "blue":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
      case "purple":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
      case "green":
        return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
      case "amber":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
      case "red":
        return "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
      default:
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    }
  }

  // Prepare radar chart data if available
  const getRadarChartData = () => {
    if (!chartData) return null

    return {
      labels: Object.keys(chartData).map((key) => key.charAt(0).toUpperCase() + key.slice(1)),
      datasets: [
        {
          label: "Score",
          data: Object.values(chartData),
          backgroundColor: "rgba(99, 102, 241, 0.2)",
          borderColor: "rgba(99, 102, 241, 1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(99, 102, 241, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(99, 102, 241, 1)",
        },
      ],
    }
  }

  // Prepare bar chart data for issues if available
  const getIssuesChartData = () => {
    if (!issuesList) return null

    return {
      labels: issuesList.map((issue) => issue.type.charAt(0).toUpperCase() + issue.type.slice(1)),
      datasets: [
        {
          label: "Issues Count",
          data: issuesList.map((issue) => issue.count),
          backgroundColor: "rgba(239, 68, 68, 0.5)",
          borderColor: "rgba(239, 68, 68, 1)",
          borderWidth: 1,
        },
      ],
    }
  }

  // Prepare bar chart data for filler words if available
  const getFillerWordsChartData = () => {
    if (!fillerWords) return null

    return {
      labels: fillerWords.map((item) => item.word),
      datasets: [
        {
          label: "Occurrences",
          data: fillerWords.map((item) => item.count),
          backgroundColor: "rgba(245, 158, 11, 0.5)",
          borderColor: "rgba(245, 158, 11, 1)",
          borderWidth: 1,
        },
      ],
    }
  }

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor()}`}>
            {title === "Structure & Logic" && "📝"}
            {title === "Style & Tone" && "🎨"}
            {title === "Grammar & Clarity" && "📚"}
            {title === "Keywords & Fillers" && "🔍"}
            {title === "Readability" && "📊"}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${getScoreColor()}`}>{score}/100</span>
              <div className={`h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
                <div
                  className={`h-full ${
                    score >= 90
                      ? "bg-green-500"
                      : score >= 70
                        ? "bg-blue-500"
                        : score >= 50
                          ? "bg-yellow-500"
                          : "bg-red-500"
                  }`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </div>

      {/* Content */}
      {expanded && (
        <div className="px-6 pb-6">
          <p className="text-gray-700 dark:text-gray-300 mb-6">{feedback}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Strengths */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Strengths</h4>
              <ul className="space-y-2">
                {strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Areas for Improvement</h4>
              <ul className="space-y-2">
                {improvements.map((improvement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{improvement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Charts and Additional Data */}
          {chartType === "radar" && chartData && (
            <div className="h-64 mb-6">
              <Radar data={getRadarChartData()} options={chartOptions} />
            </div>
          )}

          {issuesList && (
            <div className="h-64 mb-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Grammar Issues</h4>
              <Bar data={getIssuesChartData()} options={chartOptions} />
            </div>
          )}

          {fillerWords && (
            <div className="h-64 mb-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Filler Words</h4>
              <Bar data={getFillerWordsChartData()} options={chartOptions} />
            </div>
          )}

          {repeatedWords && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Repeated Words</h4>
              <div className="flex flex-wrap gap-2">
                {repeatedWords.map((item, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-full text-sm flex items-center"
                  >
                    {item.word}{" "}
                    <span className="ml-1 bg-amber-200 dark:bg-amber-800 px-1.5 rounded-full text-xs">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Flesch-Kincaid Score</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {metrics.fleschKincaid.toFixed(1)}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg. Sentence Length</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {metrics.averageSentenceLength} words
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Complex Words</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">{metrics.complexWords}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default ResultsCard
