"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Palette,
  Search,
  Key,
  BarChart,
  Lightbulb,
  FileText,
  Award,
} from "lucide-react"
import HighlightTextBox from "./HighlightTextBox"

const TextInsights = ({ results, originalText }) => {
  const [expandedSections, setExpandedSections] = useState({
    structure: true,
    style: true,
    clarity: true,
    keywords: true,
    readability: true,
    suggestions: true,
    paraphrased: true,
  })

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Get score color based on value
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500 dark:text-green-400"
    if (score >= 60) return "text-yellow-500 dark:text-yellow-400"
    return "text-red-500 dark:text-red-400"
  }

  // Get readability color
  const getReadabilityColor = (score) => {
    if (score >= 70) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (score >= 50) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
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
    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
      {/* Overall Score */}
      <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6" variants={itemVariants}>
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
                  results.overallScore >= 80
                    ? "text-green-500"
                    : results.overallScore >= 60
                      ? "text-yellow-500"
                      : "text-red-500"
                }`}
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${results.overallScore}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text
                x="18"
                y="20.35"
                className="fill-current text-gray-800 dark:text-gray-200 font-bold text-5xl"
                textAnchor="middle"
              >
                {results.overallScore}
              </text>
            </svg>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Overall Assessment</h2>
            <div className="flex flex-wrap gap-2 mb-3 justify-center md:justify-start">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
                Structure
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 rounded-full text-sm font-medium">
                Style
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-medium">
                Clarity
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-full text-sm font-medium">
                Readability
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{results.overallFeedback}</p>
          </div>
        </div>
      </motion.div>

      {/* Structure Analysis Section */}
      <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden" variants={itemVariants}>
        <div
          className="flex items-center justify-between p-6 cursor-pointer"
          onClick={() => toggleSection("structure")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Structure Analysis</h3>
          </div>
          {expandedSections.structure ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>
        {expandedSections.structure && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Introduction</p>
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${results.structure.hasIntro ? "bg-green-500" : "bg-red-500"} mr-2`}
                  ></div>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {results.structure.hasIntro ? "Present" : "Missing"}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Body</p>
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${results.structure.hasBody ? "bg-green-500" : "bg-red-500"} mr-2`}
                  ></div>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {results.structure.hasBody ? "Present" : "Missing"}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Conclusion</p>
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${results.structure.hasConclusion ? "bg-green-500" : "bg-red-500"} mr-2`}
                  ></div>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {results.structure.hasConclusion ? "Present" : "Missing"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Call to Action</p>
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full ${results.structure.hasCallToAction ? "bg-green-500" : "bg-yellow-500"} mr-2`}
                ></div>
                <p className="text-gray-900 dark:text-white font-medium">
                  {results.structure.hasCallToAction ? "Present" : "Missing"}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Logical Flow</p>
              <p className="text-gray-700 dark:text-gray-300">{results.structure.logicalFlow}</p>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4">{results.structure.feedback}</p>
          </div>
        )}
      </motion.div>

      {/* Style & Tone Section */}
      <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden" variants={itemVariants}>
        <div className="flex items-center justify-between p-6 cursor-pointer" onClick={() => toggleSection("style")}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Style & Tone</h3>
          </div>
          {expandedSections.style ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>
        {expandedSections.style && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Style Type</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">{results.style.type}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Formality Level</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">{results.style.formality}</p>
              </div>
            </div>

            {results.style.toneMismatches.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400 mb-2">Tone Mismatches</p>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                  {results.style.toneMismatches.map((mismatch, index) => (
                    <li key={index}>{mismatch}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-gray-700 dark:text-gray-300">{results.style.feedback}</p>
          </div>
        )}
      </motion.div>

      {/* Clarity & Grammar Section */}
      <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden" variants={itemVariants}>
        <div className="flex items-center justify-between p-6 cursor-pointer" onClick={() => toggleSection("clarity")}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Search className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Clarity & Grammar</h3>
          </div>
          {expandedSections.clarity ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>
        {expandedSections.clarity && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg. Sentence Length</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {results.clarity.averageSentenceLength} words
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Complex Sentences</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {results.clarity.complexSentences}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Grammar Issues</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">{results.clarity.grammarIssues}</p>
              </div>
            </div>

            {results.clarity.repetitiveWords.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Repetitive Words</p>
                <div className="flex flex-wrap gap-2">
                  {results.clarity.repetitiveWords.map((word, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-full text-sm"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-gray-700 dark:text-gray-300 mt-4">{results.clarity.feedback}</p>
          </div>
        )}
      </motion.div>

      {/* Keywords & Fillers Section */}
      <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden" variants={itemVariants}>
        <div className="flex items-center justify-between p-6 cursor-pointer" onClick={() => toggleSection("keywords")}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Key className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Keywords & Fillers</h3>
          </div>
          {expandedSections.keywords ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>
        {expandedSections.keywords && (
          <div className="px-6 pb-6">
            <div className="mb-4">
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Filler Words</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {Object.entries(results.keywords.fillerWords).map(([word, count], index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-full text-sm flex items-center"
                  >
                    {word}{" "}
                    <span className="ml-1 bg-yellow-200 dark:bg-yellow-800 px-1.5 rounded-full text-xs">{count}</span>
                  </span>
                ))}
              </div>
              <HighlightTextBox text={originalText} highlights={results.keywords.fillerWords} type="filler" />
            </div>

            <div className="mt-6">
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Jargon Words</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                {Object.entries(results.keywords.jargonWords).map(([word, replacement], index) => (
                  <div key={index} className="flex items-center bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
                    <span className="font-medium text-purple-800 dark:text-purple-300">{word}</span>
                    <span className="mx-2 text-gray-400">→</span>
                    <span className="text-green-600 dark:text-green-400">{replacement}</span>
                  </div>
                ))}
              </div>
              <HighlightTextBox text={originalText} highlights={results.keywords.jargonWords} type="jargon" />
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4">{results.keywords.feedback}</p>
          </div>
        )}
      </motion.div>

      {/* Readability Scores Section */}
      <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden" variants={itemVariants}>
        <div
          className="flex items-center justify-between p-6 cursor-pointer"
          onClick={() => toggleSection("readability")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <BarChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Readability Scores</h3>
          </div>
          {expandedSections.readability ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>
        {expandedSections.readability && (
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
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
                      results.readability.fleschScore >= 70
                        ? "text-green-500"
                        : results.readability.fleschScore >= 50
                          ? "text-blue-500"
                          : "text-yellow-500"
                    }`}
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${results.readability.fleschScore}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text
                    x="18"
                    y="20.35"
                    className="fill-current text-gray-800 dark:text-gray-200 font-bold text-5xl"
                    textAnchor="middle"
                  >
                    {results.readability.fleschScore.toFixed(1)}
                  </text>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Flesch Reading Ease</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  This score indicates how easy your text is to read.
                </p>
                <div className="flex items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getReadabilityColor(results.readability.fleschScore)}`}
                  >
                    {results.readability.fleschScore >= 80
                      ? "Very Easy (6th grade)"
                      : results.readability.fleschScore >= 70
                        ? "Easy (7th grade)"
                        : results.readability.fleschScore >= 60
                          ? "Standard (8-9th grade)"
                          : results.readability.fleschScore >= 50
                            ? "Fairly Difficult (10-12th grade)"
                            : "Difficult (College level)"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Sentence-to-Word Ratio</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  1:{results.readability.sentenceToWordRatio.toFixed(1)}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Passive Voice Count</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {results.readability.passiveVoiceCount}
                </p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4">{results.readability.feedback}</p>
          </div>
        )}
      </motion.div>

      {/* AI Rewrite Suggestions Section */}
      <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden" variants={itemVariants}>
        <div
          className="flex items-center justify-between p-6 cursor-pointer"
          onClick={() => toggleSection("suggestions")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI Rewrite Suggestions</h3>
          </div>
          {expandedSections.suggestions ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>
        {expandedSections.suggestions && (
          <div className="px-6 pb-6">
            <ul className="space-y-3">
              {results.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">💡</span>
                  <span className="text-gray-800 dark:text-gray-200">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/* Paraphrased Version Section */}
      <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden" variants={itemVariants}>
        <div
          className="flex items-center justify-between p-6 cursor-pointer"
          onClick={() => toggleSection("paraphrased")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Paraphrased Version</h3>
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
              <p className="text-gray-700 dark:text-gray-300 italic">{results.paraphrased.text}</p>
            </div>
            <div className="mt-4 flex items-start gap-2">
              <Award className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is an improved version of your text with better clarity, structure, and impact.
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <motion.button
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText size={16} />
                Copy Improved Version
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default TextInsights
