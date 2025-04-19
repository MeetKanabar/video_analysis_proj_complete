"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import BackButton from "../components/BackButton"

const wordsAndDefinitions = {
  serendipity: "The occurrence of events by chance in a happy or beneficial way",
  ephemeral: "Lasting for a very short time",
  aesthetic: "Concerned with beauty or the appreciation of beauty",
  quintessential: "Representing the most perfect or typical example of something",
  elucidate: "To make (something) clear; to explain",
  melancholy: "A feeling of pensive sadness, typically with no obvious cause",
  ineffable: "Too great or extreme to be expressed or described in words",
  gregarious: "Fond of company; sociable",
  ubiquitous: "Present, appearing, or found everywhere",
  vicarious: "Experienced in the imagination through the feelings or actions of another person",
}

const getOptions = (correctDefinition) => {
  const allDefinitions = Object.values(wordsAndDefinitions)
  const options = [correctDefinition]

  while (options.length < 4) {
    const randomOption = allDefinitions[Math.floor(Math.random() * allDefinitions.length)]
    if (!options.includes(randomOption)) {
      options.push(randomOption)
    }
  }

  return options.sort(() => Math.random() - 0.5)
}

const DefinitionQuiz = () => {
  const [questions, setQuestions] = useState(Object.entries(wordsAndDefinitions))
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const [word, correctDefinition] = currentQuestion
  const options = getOptions(correctDefinition)

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option)
    if (option === correctDefinition) {
      setScore(score + 1)
    }
    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
    exit: { opacity: 0 },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 relative">
          <BackButton />

          <motion.div
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Definition Quiz 🧠</h1>

            {!showResult ? (
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-semibold text-center mb-6">
                  What is the meaning of "<span className="text-blue-600 dark:text-blue-400">{word}</span>"?
                </h2>

                <motion.div className="mt-6 space-y-3" variants={containerVariants} initial="hidden" animate="visible">
                  {options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerClick(option)}
                      className={`w-full px-4 py-3 border dark:border-gray-700 rounded-lg text-left transition-colors ${
                        selectedAnswer
                          ? option === correctDefinition
                            ? "bg-green-500 dark:bg-green-600 text-white"
                            : option === selectedAnswer
                              ? "bg-red-500 dark:bg-red-600 text-white"
                              : "bg-white dark:bg-gray-800"
                          : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      disabled={selectedAnswer !== null}
                      variants={childVariants}
                    >
                      {option}
                    </motion.button>
                  ))}
                </motion.div>

                <div className="mt-6 text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h2
                  className="text-3xl font-bold mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  Quiz Complete! 🎉
                </motion.h2>
                <p className="text-lg mt-4">
                  Your final score:{" "}
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    {score} / {questions.length}
                  </span>
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {score === questions.length
                    ? "Perfect! You're a vocabulary master!"
                    : score >= questions.length * 0.7
                      ? "Great job! Your vocabulary is impressive."
                      : "Keep practicing to improve your vocabulary!"}
                </p>
                <motion.button
                  onClick={() => {
                    setCurrentQuestionIndex(0)
                    setScore(0)
                    setShowResult(false)
                    // Shuffle questions for a new game
                    setQuestions([...questions].sort(() => Math.random() - 0.5))
                  }}
                  className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Again
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default DefinitionQuiz
