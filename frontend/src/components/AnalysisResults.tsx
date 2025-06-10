"use client"

import type React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { EmotionChart } from "./charts/EmotionChart";
import { EngagementChart } from "./charts/EngagementChart";
import { EyeContactChart } from "./charts/EyeContactChart";
import { PostureChart } from "./charts/PostureChart";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { AlertCircle, Award, ThumbsUp, Lightbulb } from "lucide-react";
import type { AnalysisResults } from "../lib/useAnalysisStore";

interface AnalysisResultsProps {
  isAnalyzing: boolean;
  analysisResults: AnalysisResults | null;
}

export default function AnalysisResults({ isAnalyzing, analysisResults }: AnalysisResultsProps) {
  if (isAnalyzing) {
    return <AnalysisLoading />;
  }

  if (!analysisResults) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>Record or upload a video to see your analysis results</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <Video className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No analysis yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your analysis results will appear here after you submit a video
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { emotions, eyeContact, posture, engagement, overallScore, strengths, improvements, timestamp } =
    analysisResults;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Overall Score</CardTitle>
            <CardDescription>Analysis completed on {new Date(timestamp).toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{overallScore}</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-muted-foreground/20"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-primary"
                    strokeWidth="10"
                    strokeDasharray={`${overallScore * 2.51} 251`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium text-muted-foreground">Eye Contact</span>
                <span className="text-xl font-bold">{eyeContact.score}%</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium text-muted-foreground">Posture</span>
                <span className="text-xl font-bold">{posture.score}%</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium text-muted-foreground">Emotion</span>
                <span className="text-xl font-bold">{emotions.primaryEmotion}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium text-muted-foreground">Engagement</span>
                <span className="text-xl font-bold">{engagement.averageScore}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>Strengths and areas for improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="flex items-center text-lg font-semibold mb-2">
                  <ThumbsUp className="mr-2 h-5 w-5 text-green-500" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Badge variant="outline" className="mr-2 bg-green-500/10">
                        <Award className="h-3 w-3 mr-1" />
                      </Badge>
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="flex items-center text-lg font-semibold mb-2">
                  <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {improvements.map((improvement: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Badge variant="outline" className="mr-2 bg-amber-500/10">
                        <AlertCircle className="h-3 w-3 mr-1" />
                      </Badge>
                      <span className="text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
          <CardDescription>Explore the different aspects of your presentation</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="emotions" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="emotions">Emotions</TabsTrigger>
              <TabsTrigger value="eyeContact">Eye Contact</TabsTrigger>
              <TabsTrigger value="posture">Posture</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </TabsList>

            <TabsContent value="emotions" className="pt-6">
              <EmotionChart data={emotions.emotionScores} />
            </TabsContent>

            <TabsContent value="eyeContact" className="pt-6">
              <EyeContactChart data={eyeContact} />
            </TabsContent>

            <TabsContent value="posture" className="pt-6">
              <PostureChart data={posture} />
            </TabsContent>

            <TabsContent value="engagement" className="pt-6">
              <EngagementChart data={engagement} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function AnalysisLoading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyzing Your Video</CardTitle>
        <CardDescription>Please wait while we process your video</CardDescription>
      </CardHeader>
      <CardContent className="py-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <svg
              className="animate-spin h-16 w-16 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">AI Analysis in Progress</h3>
            <p className="text-sm text-muted-foreground">
              We're analyzing your speaking patterns, emotions, eye contact, and posture
            </p>
          </div>
          <div className="w-full max-w-md space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Video(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14v-4z" />
      <rect x="3" y="6" width="12" height="12" rx="2" ry="2" />
    </svg>
  );
}