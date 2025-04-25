"use client"

import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600 dark:text-blue-400">SpeakBetter</h1>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Improve Your Public Speaking Skills</h2>

        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
          Get personalized feedback on your presentations and speeches. Upload or record a video and receive detailed
          analysis on your emotions, engagement, posture, and attention.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/record")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
        >
          Get Started
        </motion.button>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <FeatureCard
          icon="📊"
          title="Detailed Analysis"
          description="Get scores on emotion, engagement, posture, and attention."
        />
        <FeatureCard
          icon="🎯"
          title="Improvement Tips"
          description="Receive personalized suggestions to enhance your speaking skills."
        />
        <FeatureCard
          icon="📈"
          title="Track Progress"
          description="Monitor your improvement over time with visual charts."
        />
      </div>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
)

export default HomePage
