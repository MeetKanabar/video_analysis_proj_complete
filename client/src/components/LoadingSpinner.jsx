"use client";

import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 mb-6">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-900/30"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        ></motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full opacity-50"
          ></motion.div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader size={32} className="text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Analyzing Your Text
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md text-center">
        Our AI is processing your text to provide detailed insights. This may
        take a moment...
      </p>

      {/* Animated Text Processing */}
      {/* <div className="mt-8 flex justify-center items-center h-12 gap-1">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 bg-blue-500 dark:bg-blue-600 rounded-full"
            animate={{
              height: [12, 24 + Math.random() * 24, 12],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.1,
            }}
          ></motion.div>
        ))}
      </div> */}
    </div>
  );
};

export default LoadingSpinner;
