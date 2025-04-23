"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextInput from "../components/TextInput";
import AnalysisCategories from "../components/AnalysisCategories";
import LoadingSpinner from "../components/LoadingSpinner";
import ResultsCard from "../components/ResultsCard";
import CustomCursor from "../components/CustomCursor";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Loader } from "lucide-react";
import Navbar from "../components/Navbar";

const TextAnalysis = () => {
  const [text, setText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState({
    structure: true,
    style: true,
    grammar: true,
    keywords: true,
    readability: true,
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const resultsRef = useRef(null);

  const handleTextChange = (newText) => {
    setText(newText);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setResults(null);

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock response data
      const mockResults = {
        structure: {
          score: 85,
          feedback:
            "Your text has a clear structure with a strong introduction and conclusion. Consider adding more transition phrases between paragraphs to improve flow.",
          strengths: [
            "Clear introduction",
            "Strong conclusion",
            "Logical paragraph order",
          ],
          improvements: [
            "Add transition phrases",
            "Consider a stronger thesis statement",
          ],
        },
        style: {
          score: 78,
          feedback:
            "Your writing style is consistent and engaging. Watch for shifts in tone in the middle section.",
          strengths: [
            "Consistent voice",
            "Engaging language",
            "Good use of examples",
          ],
          improvements: [
            "Maintain formal tone throughout",
            "Vary sentence structure more",
          ],
          toneAnalysis: {
            formal: 65,
            casual: 20,
            persuasive: 45,
            informative: 80,
          },
        },
        grammar: {
          score: 92,
          feedback:
            "Excellent grammar overall. A few minor issues with comma usage and subject-verb agreement.",
          strengths: ["Proper punctuation", "Good sentence structure"],
          improvements: [
            "Review comma usage",
            "Check subject-verb agreement in paragraph 3",
          ],
          issues: [
            { type: "comma", count: 3 },
            { type: "subject-verb", count: 2 },
            { type: "spelling", count: 1 },
          ],
        },
        keywords: {
          score: 80,
          feedback:
            "Good use of keywords and minimal filler words. Consider reducing repetition of certain terms.",
          strengths: ["Minimal filler words", "Strong vocabulary"],
          improvements: [
            "Reduce repetition of 'essentially'",
            "Consider synonyms for 'important'",
          ],
          fillerWords: [
            { word: "basically", count: 2 },
            { word: "actually", count: 3 },
            { word: "literally", count: 1 },
          ],
          repeatedWords: [
            { word: "important", count: 5 },
            { word: "essentially", count: 4 },
          ],
        },
        readability: {
          score: 75,
          feedback:
            "Your text is readable at a high school level (Grade 10-12). Consider simplifying some complex sentences for broader accessibility.",
          strengths: ["Good paragraph length", "Clear main points"],
          improvements: [
            "Simplify complex sentences",
            "Break up longer paragraphs",
          ],
          metrics: {
            fleschKincaid: 65.2,
            averageSentenceLength: 18.5,
            complexWords: 12,
          },
        },
      };

      setResults(mockResults);

      // Scroll to results after a short delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } catch (error) {
      console.error("Error analyzing text:", error);
      // Handle error state
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isAnalyzeDisabled =
    !text.trim() ||
    !Object.values(selectedCategories).some((selected) => selected);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <CustomCursor />

        {/* Header */}
        <header className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Text Analysis Tool
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Analyze your writing skills using AI-powered feedback
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Analyze Your Text
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Get AI-powered feedback on your writing to improve clarity, style,
              and impact.
            </p>
          </motion.div> */}

          {/* Text Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <TextInput text={text} onTextChange={handleTextChange} />
          </motion.div>

          {/* Analysis Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold mb-4">Analysis Categories</h3>
            <AnalysisCategories
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </motion.div>

          {/* Analyze Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 flex justify-center"
          >
            <motion.button
              onClick={handleAnalyze}
              disabled={isAnalyzeDisabled}
              className={`px-8 py-3 rounded-lg font-medium text-white shadow-lg flex items-center gap-2 ${
                isAnalyzeDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 transition-colors"
              }`}
              whileHover={!isAnalyzeDisabled ? { scale: 1.05 } : {}}
              whileTap={!isAnalyzeDisabled ? { scale: 0.95 } : {}}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Text"}
            </motion.button>
          </motion.div>

          {/* Loading Spinner */}
          {isAnalyzing && (
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 mb-6">
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-900/30"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  ></motion.div>
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  ></motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader
                      size={32}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Analyzing Your Text
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-md">
                  Our AI is processing your text to provide detailed insights.
                  This may take a moment...
                </p>
              </div>

              {/* Animated Waveform */}
              <div className="mt-8 flex justify-center items-center h-12 gap-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 bg-blue-500 dark:bg-blue-600 rounded-full"
                    animate={{
                      height: [12, 24 + Math.random() * 24, 12],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.1,
                    }}
                  ></motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {/* Results Section */}
          <div ref={resultsRef}>
            <AnimatePresence>
              {results && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-12"
                >
                  <h2 className="text-2xl font-semibold mb-6 text-center">
                    Analysis Results
                  </h2>
                  <div className="space-y-8">
                    {selectedCategories.structure && results.structure && (
                      <ResultsCard
                        title="Structure & Logic"
                        score={results.structure.score}
                        feedback={results.structure.feedback}
                        strengths={results.structure.strengths}
                        improvements={results.structure.improvements}
                        color="blue"
                        delay={0.1}
                      />
                    )}

                    {selectedCategories.style && results.style && (
                      <ResultsCard
                        title="Style & Tone"
                        score={results.style.score}
                        feedback={results.style.feedback}
                        strengths={results.style.strengths}
                        improvements={results.style.improvements}
                        chartData={results.style.toneAnalysis}
                        chartType="radar"
                        color="purple"
                        delay={0.2}
                      />
                    )}

                    {selectedCategories.grammar && results.grammar && (
                      <ResultsCard
                        title="Grammar & Clarity"
                        score={results.grammar.score}
                        feedback={results.grammar.feedback}
                        strengths={results.grammar.strengths}
                        improvements={results.grammar.improvements}
                        issuesList={results.grammar.issues}
                        color="green"
                        delay={0.3}
                      />
                    )}

                    {selectedCategories.keywords && results.keywords && (
                      <ResultsCard
                        title="Keywords & Fillers"
                        score={results.keywords.score}
                        feedback={results.keywords.feedback}
                        strengths={results.keywords.strengths}
                        improvements={results.keywords.improvements}
                        fillerWords={results.keywords.fillerWords}
                        repeatedWords={results.keywords.repeatedWords}
                        color="amber"
                        delay={0.4}
                      />
                    )}

                    {selectedCategories.readability && results.readability && (
                      <ResultsCard
                        title="Readability"
                        score={results.readability.score}
                        feedback={results.readability.feedback}
                        strengths={results.readability.strengths}
                        improvements={results.readability.improvements}
                        metrics={results.readability.metrics}
                        color="red"
                        delay={0.5}
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TextAnalysis;
