"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import BackButton from "../components/BackButton"

const WordExplorer = () => {
  const [word, setWord] = useState("")
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchWordData = async () => {
    if (!word.trim()) return
    setLoading(true)
    setError("")
    setData(null)

    try {
      const response = await fetch(`http://localhost:5000/word-explorer/${word}`)
      const result = await response.json()

      if (response.ok) {
        setData(result)
      } else {
        setError(result.error || "Something went wrong.")
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 relative">
          <BackButton />

          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400 mb-8">Word Explorer 📖</h1>

            <div className="flex space-x-2 mb-8">
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter a word..."
                className="px-4 py-2 border rounded-lg flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === "Enter" && fetchWordData()}
              />
              <motion.button
                onClick={fetchWordData}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore
              </motion.button>
            </div>

            {loading && (
              <motion.p
                className="mt-4 text-center text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Loading...
              </motion.p>
            )}

            {error && (
              <motion.p
                className="mt-4 text-center text-red-600 dark:text-red-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}

            {data && (
              <motion.div
                className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">{data.word}</h2>

                {/* Pronunciation Audio */}
                {data.audio && (
                  <div className="mt-4">
                    <audio controls className="w-full">
                      <source src={`http://localhost:5000${data.audio}`} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}

                {/* Definitions */}
                {data.definitions && data.definitions.length > 0 && (
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Definitions:</h3>
                    <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
                      {data.definitions.map((def, index) => (
                        <li key={index}>{def}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Synonyms */}
                {data.synonyms && data.synonyms.length > 0 && (
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Synonyms:</h3>
                    <p className="text-gray-700 dark:text-gray-300">{data.synonyms.join(", ")}</p>
                  </motion.div>
                )}

                {/* Antonyms */}
                {data.antonyms && data.antonyms.length > 0 && (
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Antonyms:</h3>
                    <p className="text-gray-700 dark:text-gray-300">{data.antonyms.join(", ")}</p>
                  </motion.div>
                )}

                {/* Example Sentences */}
                {data.examples && data.examples.length > 0 && (
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Example Sentences:</h3>
                    <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
                      {data.examples.map((ex, index) => (
                        <li key={index}>{ex}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default WordExplorer
