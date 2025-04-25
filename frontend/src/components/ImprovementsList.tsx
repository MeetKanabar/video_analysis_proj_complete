"use client"

import { motion } from "framer-motion"

interface ImprovementsListProps {
  improvements: string[]
}

const ImprovementsList = ({ improvements }: ImprovementsListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
    >
      <h3 className="text-xl font-bold mb-4">Areas for Improvement</h3>

      <div className="flex justify-center mb-6">
        <img
          src="/posture-illustration.svg"
          alt="Good posture illustration"
          className="h-40 w-auto"
          onError={(e) => {
            // Fallback if image doesn't exist
            e.currentTarget.style.display = "none"
          }}
        />
      </div>

      <ul className="space-y-3">
        {improvements.map((improvement, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
              <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">{index + 1}</span>
            </div>
            <span className="text-gray-700 dark:text-gray-300">{improvement}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default ImprovementsList
