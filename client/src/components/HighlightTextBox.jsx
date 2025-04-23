"use client"

import { useState, useEffect } from "react"

const HighlightTextBox = ({ text, highlights, type = "filler" }) => {
  const [highlightedText, setHighlightedText] = useState("")

  useEffect(() => {
    if (!text || !highlights) {
      setHighlightedText(text)
      return
    }

    let processedText = text

    if (type === "filler") {
      // Highlight filler words
      Object.keys(highlights).forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "gi")
        processedText = processedText.replace(
          regex,
          `<span class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded" title="Filler word">$&</span>`,
        )
      })
    } else if (type === "jargon") {
      // Highlight jargon words with replacement suggestions
      Object.entries(highlights).forEach(([word, replacement]) => {
        const regex = new RegExp(`\\b${word}\\b`, "gi")
        processedText = processedText.replace(
          regex,
          `<span class="bg-purple-200 dark:bg-purple-800 px-1 rounded" title="Consider: ${replacement}">$&</span>`,
        )
      })
    }

    setHighlightedText(processedText)
  }, [text, highlights, type])

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-auto max-h-96">
      {highlightedText ? (
        <p
          className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        ></p>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 italic">No text to display</p>
      )}
    </div>
  )
}

export default HighlightTextBox
