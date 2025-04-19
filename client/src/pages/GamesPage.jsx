"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import GamesComponent from "../components/GamesComponent"
import { motion } from "framer-motion"

const GamesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Fun Learning Games 🎮</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Improve your language skills with these interactive games designed to make learning engaging and
              effective.
            </p>
          </motion.div>

          <GamesComponent />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default GamesPage
