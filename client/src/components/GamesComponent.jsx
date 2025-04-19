"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const games = [
  {
    title: "Word Explorer",
    description: "Enter a word and get its definition, pronunciation, antonyms, and example sentences.",
    path: "/word-explorer",
    icon: "📖",
  },
  {
    title: "Definition Quiz",
    description: "Test your knowledge with a quiz of 10-15 word definitions. Choose the right answer!",
    path: "/definition-quiz",
    icon: "🧠",
  },
  {
    title: "Pronunciation Check",
    description: "Practice and improve your pronunciation by speaking words correctly.",
    path: "/pronunciation-check",
    icon: "🎙️",
  },
  {
    title: "Speaking Challenge",
    description: "Talk for 30 seconds about a given topic and get AI feedback on clarity and fluency.",
    path: "/speaking-challenge",
    icon: "🗣️",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const GamesComponent = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {games.map((game, index) => (
        <motion.div
          key={index}
          variants={item}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <div className="flex items-start mb-4">
            <span className="text-3xl mr-3">{game.icon}</span>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">{game.title}</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{game.description}</p>
          <Link
            to={game.path}
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Play Now →
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default GamesComponent
