"use client"

import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Construction } from "lucide-react"

const VideoPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Construction size={32} className="text-yellow-600 dark:text-yellow-400" />
            </motion.div>

            <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Coming Soon</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We're working hard to bring you video analysis features. This functionality will allow you to analyze your
              body language, facial expressions, and overall presentation style.
            </p>

            <motion.div
              className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="h-full w-3/4 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
            </motion.div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Video analysis feature is 75% complete</p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default VideoPage
