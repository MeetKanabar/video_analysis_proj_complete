"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

const BackButton = () => {
  return (
    <motion.div
      className="absolute top-6 left-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/games"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all text-gray-700 dark:text-gray-200"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </Link>
    </motion.div>
  )
}

export default BackButton
