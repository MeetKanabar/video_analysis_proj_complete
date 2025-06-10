"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface GazeChartProps {
  gaze: {
    looking: number
    notLooking: number
  }
}

const GazeChart = ({ gaze }: GazeChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create chart
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Looking at Camera", "Not Looking at Camera"],
          datasets: [
            {
              data: [gaze.looking, gaze.notLooking],
              backgroundColor: [
                "#3B82F6", // Blue
                "#E5E7EB", // Light gray
              ],
              borderColor: ["#2563EB", "#D1D5DB"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.parsed
                  const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
                  const percentage = Math.round((value / total) * 100)
                  return `${context.label}: ${percentage}%`
                },
              },
            },
          },
        },
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [gaze])

  const lookingPercentage = Math.round((gaze.looking / (gaze.looking + gaze.notLooking)) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
    >
      <h3 className="text-xl font-bold mb-4">Eye Contact Analysis</h3>

      <div className="text-center mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">You maintained eye contact for</p>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{lookingPercentage}%</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">of your presentation</p>
      </div>

      <div className="h-48">
        <canvas ref={chartRef}></canvas>
      </div>
    </motion.div>
  )
}

export default GazeChart 