"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { MicIcon, Video, FileText } from "lucide-react"

const PracticePage = () => {
  const practiceOptions = [
    {
      title: "Audio Analysis",
      description: "Record your voice and get detailed feedback on tone, emotion, and speaking patterns.",
      icon: <MicIcon className="w-12 h-12 text-blue-500" />,
      color: "from-blue-400 to-blue-600",
      path: "/audio",
    },
    {
      title: "Video Analysis",
      description: "Analyze your body language, facial expressions, and overall presentation style.",
      icon: <Video className="w-12 h-12 text-purple-500" />,
      color: "from-purple-400 to-purple-600",
      path: "/video",
    },
    {
      title: "Text Analysis",
      description: "Get feedback on your written content for speeches, presentations, and scripts.",
      icon: <FileText className="w-12 h-12 text-green-500" />,
      color: "from-green-400 to-green-600",
      path: "/text",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Choose an Analysis Type
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Select how you want to practice and receive AI-powered feedback to enhance your communication skills.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {practiceOptions.map((option, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
              >
                <div className={`h-2 w-full bg-gradient-to-r ${option.color}`}></div>
                <div className="p-6">
                  <div className="w-16 h-16 mb-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{option.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{option.description}</p>
                  <Link
                    to={option.path}
                    className="inline-flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Get Started
                    <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PracticePage
