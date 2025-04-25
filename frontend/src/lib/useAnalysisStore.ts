import { create } from "zustand";

interface EmotionData {
  primaryEmotion: string;
  emotionScores: { name: string; score: number }[];
  emotionOverTime: { time: number; emotion: string }[];
}

interface EyeContactData {
  score: number;
  timeWithContact: number;
  totalTime: number;
  contactOverTime: { time: number; percentage: number }[];
}

interface PostureData {
  score: number;
  shoulderAlignment: number;
  headPosition: number;
  stability: number;
  postureOverTime: { time: number; alignment: number; stability: number }[];
}

interface EngagementData {
  averageScore: number;
  peakMoments: { time: number; score: number; reason: string }[];
  lowMoments: { time: number; score: number; reason: string }[];
  engagementOverTime: { time: number; score: number }[];
}

export interface AnalysisResults {
  emotions: EmotionData;
  eyeContact: EyeContactData;
  posture: PostureData;
  engagement: EngagementData;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  timestamp: string;
}

interface AnalysisStore {
  isAnalyzing: boolean;
  analysisResults: AnalysisResults | null;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setAnalysisResults: (results: AnalysisResults | null) => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  isAnalyzing: false,
  analysisResults: null,
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisResults: (results) => set({ analysisResults: results }),
})); 