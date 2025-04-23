"use client"

import { Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"
import { SignIn, SignUp, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react"

// Pages
import HomePage from "./pages/HomePage"
import PracticePage from "./pages/PracticePage"
import GamesPage from "./pages/GamesPage"
import AudioAnalysis from "./pages/AudioAnalysis"
import VideoPage from "./pages/VideoPage"
import WordExplorer from "./pages/WordExplorer"
import DefinitionQuiz from "./pages/DefinitionQuiz"
import PronunciationCheck from "./pages/PronunciationCheck"

// Components
import AnimatedCursor from "./components/AnimatedCursor"
import Loader from "./components/Loader"
import TextAnalysis from "./pages/TextAnalysis"

function App() {
  const location = useLocation()

  return (
    <>
      <AnimatedCursor />

      <ClerkLoading>
        <Loader />
      </ClerkLoading>

      <ClerkLoaded>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/audio" element={<AudioAnalysis />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/text" element={<TextAnalysis />} />
            <Route path="/word-explorer" element={<WordExplorer />} />
            <Route path="/definition-quiz" element={<DefinitionQuiz />} />
            <Route path="/pronunciation-check" element={<PronunciationCheck />} />
            <Route path="/signin" element={<SignIn routing="path" path="/signin" />} />
            <Route path="/signup" element={<SignUp routing="path" path="/signup" />} />
          </Routes>
        </AnimatePresence>
      </ClerkLoaded>
    </>
  )
}

export default App
