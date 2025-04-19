"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

const AnimatedCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleLinkHoverStart = () => setLinkHovered(true)
    const handleLinkHoverEnd = () => setLinkHovered(false)

    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverStart)
      link.addEventListener("mouseleave", handleLinkHoverEnd)
    })

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverStart)
        link.removeEventListener("mouseleave", handleLinkHoverEnd)
      })
    }
  }, [])

  const cursorColor = theme === "dark" ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0.5)"
  const trailColor = theme === "dark" ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.2)"

  const springConfig = { damping: 25, stiffness: 300 }

  return (
    <>
      {/* Cursor Dot */}
      <motion.div
        className="cursor-dot pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          height: clicked ? 28 : linkHovered ? 36 : 24,
          width: clicked ? 28 : linkHovered ? 36 : 24,
          borderRadius: "50%",
          backgroundColor: cursorColor,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          opacity: hidden ? 0 : 1,
          filter: "blur(2px)",
        }}
        animate={{
          x: position.x - (clicked ? 14 : linkHovered ? 18 : 12),
          y: position.y - (clicked ? 14 : linkHovered ? 18 : 12),
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
        }}
        transition={springConfig}
      />

      {/* Cursor Trail */}
      <motion.div
        className="cursor-trail pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          height: 80,
          width: 80,
          borderRadius: "50%",
          backgroundColor: trailColor,
          position: "fixed",
          opacity: hidden ? 0 : 0.5,
          filter: "blur(10px)",
        }}
        animate={{
          x: position.x - 40,
          y: position.y - 40,
          scale: clicked ? 1.2 : linkHovered ? 1.5 : 1,
        }}
        transition={{
          ...springConfig,
          delay: 0.1,
        }}
      />
    </>
  )
}

export default AnimatedCursor
