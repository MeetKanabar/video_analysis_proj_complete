"use client"

import { motion } from "framer-motion"

interface ScoreCardProps {
  scores: {
    emotion: number
    engagement: number
    posture: number
    attention: number
    total: number
  }
}

const ScoreCard = ({ scores }: ScoreCardProps) => {
  const scoreItems = [
    { name: "Emotion", score: scores.emotion, color: "bg-blue-500" },
    { name: "Engagement", score: scores.engagement, color: "bg-green-500" },
    { name: "Posture", score: scores.posture, color: "bg-purple-500" },
    { name: "Attention", score: scores.attention, color: "bg-yellow-500" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
    >
      <h3 className="text-xl font-bold mb-4">Performance Scores</h3>

      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200 dark:text-gray-700"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              className="text-blue-600 dark:text-blue-500"
              strokeWidth="10"
              strokeDasharray={`${scores.total * 2.51} 251`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl font-bold">{scores.total}</span>
              <span className="text-sm block">/100</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {scoreItems.map((item) => (
          <div key={item.name} className="space-y-1">
            <div className="flex justify-between text-sm font-medium">
              <span>{item.name}</span>
              <span>{item.score}/25</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.score / 25) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default ScoreCard
