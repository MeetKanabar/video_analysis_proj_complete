"use client"

import { useParams } from "react-router-dom"
import { useEffect } from "react"
import AnalysisResults from "../components/AnalysisResults"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { useAnalysisStore } from "../lib/useAnalysisStore"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import { Link } from "react-router-dom"

export default function AnalysisPage() {
  const { id } = useParams<{ id: string }>()
  const { setAnalysisResults } = useAnalysisStore()

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setTimeout(() => {
          const mockAnalysisData = {
            emotions: {
              primaryEmotion: "Confident",
              emotionScores: [
                { name: "Confident", score: 45 },
                { name: "Enthusiastic", score: 25 },
                { name: "Neutral", score: 15 },
                { name: "Nervous", score: 10 },
                { name: "Uncertain", score: 5 },
              ],
              emotionOverTime: Array.from({ length: 20 }, (_, i) => ({
                time: i * 30,
                emotion: i % 5 === 0 ? "Nervous" : i % 3 === 0 ? "Enthusiastic" : "Confident",
              })),
            },
            eyeContact: {
              score: 78,
              timeWithContact: 280,
              totalTime: 360,
              contactOverTime: Array.from({ length: 12 }, (_, i) => ({
                time: i * 30,
                percentage: 65 + Math.floor(Math.random() * 30),
              })),
            },
            posture: {
              score: 82,
              shoulderAlignment: 85,
              headPosition: 80,
              stability: 75,
              postureOverTime: Array.from({ length: 12 }, (_, i) => ({
                time: i * 30,
                alignment: 80 + Math.floor(Math.random() * 15),
                stability: 70 + Math.floor(Math.random() * 20),
              })),
            },
            engagement: {
              averageScore: 76,
              peakMoments: [
                { time: 90, score: 92, reason: "Used compelling storytelling" },
                { time: 210, score: 88, reason: "Demonstrated with visual aid" },
                { time: 300, score: 90, reason: "Shared relevant case study" },
              ],
              lowMoments: [
                { time: 60, score: 55, reason: "Technical explanation was too complex" },
                { time: 180, score: 60, reason: "Monotone delivery during data section" },
              ],
              engagementOverTime: Array.from({ length: 12 }, (_, i) => ({
                time: i * 30,
                score: 65 + Math.floor(Math.random() * 30),
              })),
            },
            overallScore: 79,
            strengths: [
              "Confident delivery throughout most of the presentation",
              "Excellent posture and body language",
              "Strong opening and closing statements",
              "Good use of vocal variety in key sections",
            ],
            improvements: [
              "Reduce technical jargon when explaining complex concepts",
              "Maintain more consistent eye contact during data sections",
              "Add more pauses after key points for emphasis",
              "Incorporate more audience engagement techniques",
            ],
            timestamp: new Date().toISOString(),
          }

          setAnalysisResults(mockAnalysisData)
        }, 1000)
      } catch (error) {
        console.error("Error fetching analysis:", error)
      }
    }

    fetchAnalysis()
  }, [id, setAnalysisResults])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Analysis Results</h1>
          <p className="text-muted-foreground">Detailed breakdown of your speaking performance</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button>
            <Share2 className="mr-2 h-4 w-4" />
            Share Results
          </Button>
        </div>
      </div>

      <AnalysisResults isAnalyzing={false} analysisResults={null} />

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>Recommendations to improve your speaking skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Practice Exercises</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Record a 2-minute introduction focusing on maintaining eye contact</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Practice the "pause and emphasize" technique for key points</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Try the mirror exercise to improve posture awareness</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Watch: "Mastering Vocal Variety in Presentations"</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Read: "The Science of Audience Engagement"</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Join: Weekly speaking practice group (virtual)</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Schedule Your Next Practice Session</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Regular practice is key to improvement. We recommend analyzing at least one presentation per week.
            </p>
            <Button>Record New Practice Session</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}