"use client"

import type React from "react"

import { Routes, Route, Navigate } from "react-router-dom"
import { SignIn, SignUp, SignedOut, useUser } from "@clerk/clerk-react"
import { Toaster } from "./components/ui/toaster"

// Pages
import Dashboard from "./pages/Dashboard"
import Results from "./pages/Results"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import MainInterface from "./pages/MainInterface"
import AnalysisPage from "./pages/AnalysisPage"

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/record" element={<MainInterface />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route
          path="/login"
          element={
            <SignedOut>
              <div className="flex items-center justify-center min-h-screen bg-background">
                <SignIn redirectUrl="/dashboard" />
              </div>
            </SignedOut>
          }
        />
        <Route
          path="/signup"
          element={
            <SignedOut>
              <div className="flex items-center justify-center min-h-screen bg-background">
                <SignUp redirectUrl="/dashboard" />
              </div>
            </SignedOut>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/results/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <Results />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/old" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
