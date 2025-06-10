"use client"

import { useState } from "react"
import VideoRecorder from "../components/VideoRecorder"
import AnalysisResults from "../components/AnalysisResults"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useUser } from "@clerk/clerk-react"
import { ArrowUpRight, BarChart, Clock, Video } from "lucide-react"

export default function Dashboard() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for recent analyses
  const recentAnalyses = [
    {
      id: "1",
      title: "Project Pitch",
      date: "2023-04-15T14:30:00",
      score: 82,
    },
    {
      id: "2",
      title: "Team Update",
      date: "2023-04-10T10:15:00",
      score: 75,
    },
    {
      id: "3",
      title: "Client Presentation",
      date: "2023-04-05T16:45:00",
      score: 88,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.firstName || "Speaker"}! Track and improve your public speaking skills.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="record">Record & Analyze</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+5% improvement</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Practice Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.5 hrs</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Analyses</CardTitle>
              <CardDescription>Your latest speaking performance analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnalyses.map((analysis) => (
                  <div
                    key={analysis.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Video className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{analysis.title}</p>
                        <p className="text-sm text-muted-foreground">{new Date(analysis.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">{analysis.score}%</p>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                      <button
                        onClick={() => (window.location.href = `/results/${analysis.id}`)}
                        className="rounded-full bg-muted p-2 hover:bg-muted/50"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="record" id="record" className="space-y-6">
          <VideoRecorder />
          <AnalysisResults />
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <AnalysisResults />
        </TabsContent>
      </Tabs>
    </div>
  )
}
