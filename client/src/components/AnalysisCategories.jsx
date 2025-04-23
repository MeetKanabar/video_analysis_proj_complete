"use client"

import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { useState } from "react"

const categories = [
  {
    id: "structure",
    label: "Structure & Logic",
    description: "Analyzes the organization, flow, and logical coherence of your text.",
    icon: "📝",
  },
  {
    id: "style",
    label: "Style & Tone",
    description: "Evaluates writing style, tone consistency, and engagement level.",
    icon: "🎨",
  },
  {
    id: "grammar",
    label: "Grammar & Clarity",
    description: "Checks for grammatical errors, sentence structure, and overall clarity.",
    icon: "📚",
  },
  {
    id: "keywords",
    label: "Keywords & Fillers",
    description: "Identifies overused words, filler phrases, and keyword optimization.",
    icon: "🔍",
  },
  {
    id: "readability",
    label: "Readability",
    description: "Measures how easy your text is to read and understand for your target audience.",
    icon: "📊",
  },
]

const AnalysisCategories = ({ selectedCategories, onCategoryChange }) => {
  const [activeTooltip, setActiveTooltip] = useState(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`relative p-4 rounded-lg border ${
            selectedCategories[category.id]
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400"
              : "border-gray-200 dark:border-gray-700"
          } cursor-pointer hover:shadow-md transition-all`}
          onClick={() => onCategoryChange(category.id)}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 text-2xl">{category.icon}</div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white">{category.label}</h4>
                <div className="relative">
                  <button
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveTooltip(activeTooltip === category.id ? null : category.id)
                    }}
                  >
                    <Info size={16} />
                  </button>
                  {activeTooltip === category.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 z-10 w-64 p-3 mt-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      {category.description}
                    </motion.div>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border ${
                    selectedCategories[category.id]
                      ? "border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400"
                      : "border-gray-300 dark:border-gray-600"
                  } flex items-center justify-center`}
                >
                  {selectedCategories[category.id] && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {selectedCategories[category.id] ? "Selected" : "Not selected"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default AnalysisCategories
