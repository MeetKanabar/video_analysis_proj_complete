"use client"

import type React from "react"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { UserButton } from "@clerk/clerk-react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { Home, BarChart, Menu, X, Video } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card shadow-lg transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold text-primary">ConfidentSpeak</h1>
            <p className="text-sm text-muted-foreground">Improve your speaking skills</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link to="/dashboard">
              <Button variant={isActive("/dashboard") ? "default" : "ghost"} className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/results/latest">
              <Button variant={isActive("/results/latest") ? "default" : "ghost"} className="w-full justify-start">
                <BarChart className="mr-2 h-4 w-4" />
                Latest Results
              </Button>
            </Link>
            <Link to="/dashboard#record">
              <Button variant="ghost" className="w-full justify-start">
                <Video className="mr-2 h-4 w-4" />
                Record New
              </Button>
            </Link>
          </nav>

          <div className="p-4 border-t mt-auto">
            <div className="flex items-center justify-between">
              <UserButton afterSignOutUrl="/login" />
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64 p-4 overflow-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  )
}
