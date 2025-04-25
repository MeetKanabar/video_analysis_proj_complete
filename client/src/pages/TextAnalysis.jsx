// "use client";

// import { useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import TextInput from "../components/TextInput";
// import AnalysisCategories from "../components/AnalysisCategories";
// import LoadingSpinner from "../components/LoadingSpinner";
// import ResultsCard from "../components/ResultsCard";
// import CustomCursor from "../components/CustomCursor";
// import { useTheme } from "../context/ThemeContext";
// import { Sun, Moon, Loader } from "lucide-react";
// import Navbar from "../components/Navbar";

// const TextAnalysis = () => {
//   const [text, setText] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState({
//     structure: true,
//     style: true,
//     grammar: true,
//     keywords: true,
//     readability: true,
//   });
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [results, setResults] = useState(null);
//   const { theme, toggleTheme } = useTheme();
//   const resultsRef = useRef(null);

//   const handleTextChange = (newText) => {
//     setText(newText);
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategories((prev) => ({
//       ...prev,
//       [category]: !prev[category],
//     }));
//   };

//   const handleAnalyze = async () => {
//     if (!text.trim()) return;

//     setIsAnalyzing(true);
//     setResults(null);

//     try {
//       // Simulate API call with a delay
//       await new Promise((resolve) => setTimeout(resolve, 3000));

//       // Mock response data
//       const mockResults = {
//         structure: {
//           score: 85,
//           feedback:
//             "Your text has a clear structure with a strong introduction and conclusion. Consider adding more transition phrases between paragraphs to improve flow.",
//           strengths: [
//             "Clear introduction",
//             "Strong conclusion",
//             "Logical paragraph order",
//           ],
//           improvements: [
//             "Add transition phrases",
//             "Consider a stronger thesis statement",
//           ],
//         },
//         style: {
//           score: 78,
//           feedback:
//             "Your writing style is consistent and engaging. Watch for shifts in tone in the middle section.",
//           strengths: [
//             "Consistent voice",
//             "Engaging language",
//             "Good use of examples",
//           ],
//           improvements: [
//             "Maintain formal tone throughout",
//             "Vary sentence structure more",
//           ],
//           toneAnalysis: {
//             formal: 65,
//             casual: 20,
//             persuasive: 45,
//             informative: 80,
//           },
//         },
//         grammar: {
//           score: 92,
//           feedback:
//             "Excellent grammar overall. A few minor issues with comma usage and subject-verb agreement.",
//           strengths: ["Proper punctuation", "Good sentence structure"],
//           improvements: [
//             "Review comma usage",
//             "Check subject-verb agreement in paragraph 3",
//           ],
//           issues: [
//             { type: "comma", count: 3 },
//             { type: "subject-verb", count: 2 },
//             { type: "spelling", count: 1 },
//           ],
//         },
//         keywords: {
//           score: 80,
//           feedback:
//             "Good use of keywords and minimal filler words. Consider reducing repetition of certain terms.",
//           strengths: ["Minimal filler words", "Strong vocabulary"],
//           improvements: [
//             "Reduce repetition of 'essentially'",
//             "Consider synonyms for 'important'",
//           ],
//           fillerWords: [
//             { word: "basically", count: 2 },
//             { word: "actually", count: 3 },
//             { word: "literally", count: 1 },
//           ],
//           repeatedWords: [
//             { word: "important", count: 5 },
//             { word: "essentially", count: 4 },
//           ],
//         },
//         readability: {
//           score: 75,
//           feedback:
//             "Your text is readable at a high school level (Grade 10-12). Consider simplifying some complex sentences for broader accessibility.",
//           strengths: ["Good paragraph length", "Clear main points"],
//           improvements: [
//             "Simplify complex sentences",
//             "Break up longer paragraphs",
//           ],
//           metrics: {
//             fleschKincaid: 65.2,
//             averageSentenceLength: 18.5,
//             complexWords: 12,
//           },
//         },
//       };

//       setResults(mockResults);

//       // Scroll to results after a short delay
//       setTimeout(() => {
//         resultsRef.current?.scrollIntoView({ behavior: "smooth" });
//       }, 500);
//     } catch (error) {
//       console.error("Error analyzing text:", error);
//       // Handle error state
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const isAnalyzeDisabled =
//     !text.trim() ||
//     !Object.values(selectedCategories).some((selected) => selected);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
//         <CustomCursor />

//         {/* Header */}
//         <header className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
//           <div className="max-w-7xl mx-auto text-center">
//             <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
//               Text Analysis Tool
//             </h1>
//             <p className="text-lg text-gray-600 dark:text-gray-300">
//               Analyze your writing skills using AI-powered feedback
//             </p>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//           {/* <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mb-8"
//           >
//             <h2 className="text-2xl font-semibold mb-4 text-center">
//               Analyze Your Text
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400 text-center">
//               Get AI-powered feedback on your writing to improve clarity, style,
//               and impact.
//             </p>
//           </motion.div> */}

//           {/* Text Input Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="mb-8"
//           >
//             <TextInput text={text} onTextChange={handleTextChange} />
//           </motion.div>

//           {/* Analysis Categories */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="mb-8"
//           >
//             <h3 className="text-xl font-semibold mb-4">Analysis Categories</h3>
//             <AnalysisCategories
//               selectedCategories={selectedCategories}
//               onCategoryChange={handleCategoryChange}
//             />
//           </motion.div>

//           {/* Analyze Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="mb-12 flex justify-center"
//           >
//             <motion.button
//               onClick={handleAnalyze}
//               disabled={isAnalyzeDisabled}
//               className={`px-8 py-3 rounded-lg font-medium text-white shadow-lg flex items-center gap-2 ${
//                 isAnalyzeDisabled
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700 transition-colors"
//               }`}
//               whileHover={!isAnalyzeDisabled ? { scale: 1.05 } : {}}
//               whileTap={!isAnalyzeDisabled ? { scale: 0.95 } : {}}
//             >
//               {isAnalyzing ? "Analyzing..." : "Analyze Text"}
//             </motion.button>
//           </motion.div>

//           {/* Loading Spinner */}
//           {isAnalyzing && (
//             <motion.div
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 text-center"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               <div className="flex flex-col items-center">
//                 <div className="relative w-24 h-24 mb-6">
//                   <motion.div
//                     className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-900/30"
//                     animate={{ scale: [1, 1.1, 1] }}
//                     transition={{
//                       duration: 2,
//                       repeat: Number.POSITIVE_INFINITY,
//                     }}
//                   ></motion.div>
//                   <motion.div
//                     className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400"
//                     animate={{ rotate: 360 }}
//                     transition={{
//                       duration: 1.5,
//                       repeat: Number.POSITIVE_INFINITY,
//                       ease: "linear",
//                     }}
//                   ></motion.div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Loader
//                       size={32}
//                       className="text-blue-600 dark:text-blue-400"
//                     />
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                   Analyzing Your Text
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 max-w-md">
//                   Our AI is processing your text to provide detailed insights.
//                   This may take a moment...
//                 </p>
//               </div>

//               {/* Animated Waveform */}
//               <div className="mt-8 flex justify-center items-center h-12 gap-1">
//                 {[...Array(12)].map((_, i) => (
//                   <motion.div
//                     key={i}
//                     className="w-1.5 bg-blue-500 dark:bg-blue-600 rounded-full"
//                     animate={{
//                       height: [12, 24 + Math.random() * 24, 12],
//                     }}
//                     transition={{
//                       duration: 1,
//                       repeat: Number.POSITIVE_INFINITY,
//                       delay: i * 0.1,
//                     }}
//                   ></motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//           {/* Results Section */}
//           <div ref={resultsRef}>
//             <AnimatePresence>
//               {results && !isAnalyzing && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                   className="mt-12"
//                 >
//                   <h2 className="text-2xl font-semibold mb-6 text-center">
//                     Analysis Results
//                   </h2>
//                   <div className="space-y-8">
//                     {selectedCategories.structure && results.structure && (
//                       <ResultsCard
//                         title="Structure & Logic"
//                         score={results.structure.score}
//                         feedback={results.structure.feedback}
//                         strengths={results.structure.strengths}
//                         improvements={results.structure.improvements}
//                         color="blue"
//                         delay={0.1}
//                       />
//                     )}

//                     {selectedCategories.style && results.style && (
//                       <ResultsCard
//                         title="Style & Tone"
//                         score={results.style.score}
//                         feedback={results.style.feedback}
//                         strengths={results.style.strengths}
//                         improvements={results.style.improvements}
//                         chartData={results.style.toneAnalysis}
//                         chartType="radar"
//                         color="purple"
//                         delay={0.2}
//                       />
//                     )}

//                     {selectedCategories.grammar && results.grammar && (
//                       <ResultsCard
//                         title="Grammar & Clarity"
//                         score={results.grammar.score}
//                         feedback={results.grammar.feedback}
//                         strengths={results.grammar.strengths}
//                         improvements={results.grammar.improvements}
//                         issuesList={results.grammar.issues}
//                         color="green"
//                         delay={0.3}
//                       />
//                     )}

//                     {selectedCategories.keywords && results.keywords && (
//                       <ResultsCard
//                         title="Keywords & Fillers"
//                         score={results.keywords.score}
//                         feedback={results.keywords.feedback}
//                         strengths={results.keywords.strengths}
//                         improvements={results.keywords.improvements}
//                         fillerWords={results.keywords.fillerWords}
//                         repeatedWords={results.keywords.repeatedWords}
//                         color="amber"
//                         delay={0.4}
//                       />
//                     )}

//                     {selectedCategories.readability && results.readability && (
//                       <ResultsCard
//                         title="Readability"
//                         score={results.readability.score}
//                         feedback={results.readability.feedback}
//                         strengths={results.readability.strengths}
//                         improvements={results.readability.improvements}
//                         metrics={results.readability.metrics}
//                         color="red"
//                         delay={0.5}
//                       />
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default TextAnalysis;

"use client";

import { useCallback } from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FileText,
  Send,
  Loader,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Check,
  Copy,
  BookOpen,
  Pencil,
  MessageSquare,
  Key,
} from "lucide-react";

const TextAnalysis = () => {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    structure: true,
    style: true,
    grammar: true,
    keywords: true,
    readability: true,
  });
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef(null);

  // Handle text input change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle file upload
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setText(reader.result);
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
      "application/rtf": [".rtf"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Analyze text
  const analyzeText = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setResults(null);

    try {
      // In a real app, you would send the text to your API
      const response = await fetch("http://localhost:5000/text-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      console.log("API response:", data);
      // For demo purposes, we'll simulate an API call with a timeout
      // await new Promise((resolve) => setTimeout(resolve, 3000))

      // // Mock response data
      // const mockResults = {
      //   structure: {
      //     issues: [
      //       {
      //         issue: "Missing clear introduction",
      //         correction: "Consider adding a brief introduction that outlines the main points of your text.",
      //       },
      //       {
      //         issue: "Paragraph structure needs improvement",
      //         correction: "Try to organize your paragraphs around a single main idea, with supporting details.",
      //       },
      //       {
      //         issue: "Weak conclusion",
      //         correction: "Strengthen your conclusion by summarizing key points and providing a clear takeaway.",
      //       },
      //     ],
      //   },
      //   style: {
      //     issues: [
      //       {
      //         issue: "Inconsistent tone",
      //         correction: "Maintain a consistent formal tone throughout your text for professional presentations.",
      //       },
      //       {
      //         issue: "Overuse of passive voice",
      //         correction: "Use active voice more frequently to make your speech more engaging and direct.",
      //       },
      //       {
      //         issue: "Limited sentence variety",
      //         correction: "Vary your sentence structure to maintain audience interest and improve flow.",
      //       },
      //     ],
      //   },
      //   grammar: {
      //     issues: [
      //       {
      //         error: "Subject-verb agreement error",
      //         correction: "The team are → The team is",
      //         rule: "Collective nouns take singular verbs",
      //       },
      //       {
      //         error: "Comma splice",
      //         correction: "I spoke, they listened → I spoke, and they listened",
      //         rule: "Use conjunctions to join independent clauses",
      //       },
      //       {
      //         error: "Misplaced modifier",
      //         correction: "Speaking quickly, the words were unclear → Speaking quickly, I made the words unclear",
      //         rule: "Ensure modifiers clearly refer to the correct subject",
      //       },
      //     ],
      //   },
      //   keywords: {
      //     issue: "Overuse of filler words",
      //     correction: "Reduce use of 'um', 'like', and 'you know' to sound more confident",
      //     fillerWords: {
      //       um: 12,
      //       like: 8,
      //       "you know": 5,
      //       actually: 4,
      //     },
      //     repeatedWords: {
      //       important: 7,
      //       basically: 5,
      //       definitely: 4,
      //     },
      //   },
      //   readability: {
      //     score: 65,
      //     level: "Fairly Easy to Read",
      //     wordComplexity: "Mixed",
      //     sentenceLength: "Average",
      //     suggestion: "Consider simplifying some technical terms and breaking up longer sentences for better clarity.",
      //     metrics: {
      //       fleschKincaid: 65.2,
      //       averageSentenceLength: 18.5,
      //       complexWords: 12,
      //       averageWordLength: 4.8,
      //     },
      //   },
      //   summary: {
      //     rating: "Good",
      //     positivePoints: ["Clear main argument", "Good use of examples", "Logical organization of ideas"],
      //     improvements: [
      //       "Reduce filler words for more confident delivery",
      //       "Vary sentence structure for better engagement",
      //       "Simplify complex terms for broader accessibility",
      //     ],
      //   },
      // }

      setResults(data);

      // Scroll to results after a short delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Copy feedback to clipboard
  const copyFeedback = () => {
    if (!results) return;

    const feedback = `
Text Analysis Report
Overall Rating: ${results.summary.rating}

Positive Points:
${results.summary?.positivePoints.map((point) => `✅ ${point}`).join("\n")}

Areas for Improvement:
${results.summary?.improvements.map((point) => `🔧 ${point}`).join("\n")}

Readability: ${results.readability.level} (Score: ${
      results.readability.score
    }/100)
    `;

    navigator.clipboard.writeText(feedback);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get readability color
  const getReadabilityColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Header */}
            <motion.div className="text-center mb-10" variants={itemVariants}>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Text Analysis
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Analyze your writing for public speaking improvement
              </p>
            </motion.div>

            {/* Text Input */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8"
              variants={itemVariants}
            >
              <div className="p-6">
                <label
                  htmlFor="text-input"
                  className="block text-lg font-medium text-gray-900 dark:text-white mb-3"
                >
                  Paste your text for analysis
                </label>
                <textarea
                  id="text-input"
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Enter or paste your text here..."
                  className="w-full h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                ></textarea>

                <div className="mt-4">
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <FileText
                      size={24}
                      className="mx-auto mb-2 text-gray-400 dark:text-gray-500"
                    />
                    {isDragActive ? (
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                        Drop the file here...
                      </p>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Or drop a file here (.txt, .rtf, .doc, .docx, .pdf)
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <motion.button
                    onClick={analyzeText}
                    disabled={!text.trim() || isAnalyzing}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white shadow-lg ${
                      !text.trim() || isAnalyzing
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 transition-colors"
                    }`}
                    whileHover={
                      text.trim() && !isAnalyzing ? { scale: 1.05 } : {}
                    }
                    whileTap={
                      text.trim() && !isAnalyzing ? { scale: 0.95 } : {}
                    }
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Analyze</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Loading/Analyzing State */}
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
                    Our AI is processing your text to provide detailed insights
                    for public speaking improvement. This may take a moment...
                  </p>
                </div>

                {/* Animated Processing Indicator */}
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

            {/* Analysis Results */}
            <div ref={resultsRef}>
              {results && !isAnalyzing && (
                <motion.div
                  className="space-y-6"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                    variants={itemVariants}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                      Text Analysis Report
                    </h2>

                    {/* Structure Section */}
                    <div className="mb-8">
                      <div
                        className="flex items-center justify-between cursor-pointer mb-4"
                        onClick={() => toggleSection("structure")}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            🧱 Structure
                          </h3>
                        </div>
                        {expandedSections.structure ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        )}
                      </div>

                      {expandedSections.structure && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                  Issue
                                </h4>
                                <p className="text-gray-900 dark:text-white">
                                  {results.structure.issue}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                  Suggestion
                                </h4>
                                <p className="text-gray-900 dark:text-white">
                                  {results.structure.correction}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Style Section */}
                    <div className="mb-8">
                      <div
                        className="flex items-center justify-between cursor-pointer mb-4"
                        onClick={() => toggleSection("style")}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <Pencil className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            🎨 Style
                          </h3>
                        </div>
                        {expandedSections.style ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        )}
                      </div>

                      {expandedSections.style && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                  Issue
                                </h4>
                                <p className="text-gray-900 dark:text-white">
                                  {results.style.issue}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                  Suggestion
                                </h4>
                                <p className="text-gray-900 dark:text-white">
                                  {results.style.correction}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Grammar Issues Section */}
                    <div className="mb-8">
                      <div
                        className="flex items-center justify-between cursor-pointer mb-4"
                        onClick={() => toggleSection("grammar")}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            📝 Grammar Issues
                          </h3>
                        </div>
                        {expandedSections.grammar ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        )}
                      </div>

                      {expandedSections.grammar && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Error
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Correction
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Rule
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {results.grammar.issues.map((item, index) => (
                                  <tr
                                    key={index}
                                    className="bg-white dark:bg-gray-800"
                                  >
                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                      {item.error}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                      {item.correction}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                      {item.rule}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Keywords & Clarity Section */}
                    <div className="mb-8">
                      <div
                        className="flex items-center justify-between cursor-pointer mb-4"
                        onClick={() => toggleSection("keywords")}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <Key className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            🔑 Keyword & Clarity
                          </h3>
                        </div>
                        {expandedSections.keywords ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        )}
                      </div>

                      {expandedSections.keywords && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                                Issue
                              </h4>
                              <p className="text-gray-900 dark:text-white">
                                {results.keywords.issue}
                              </p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                                Suggestion
                              </h4>
                              <p className="text-gray-900 dark:text-white">
                                {results.keywords.correction}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Filler Words */}
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                                Filler Words
                              </h4>
                              {/* <div className="space-y-2">
                                {Object.entries(
                                  results.keywords.fillerWords
                                ).map(([word, count]) => (
                                  <div
                                    key={word}
                                    className="flex justify-between items-center"
                                  >
                                    <span className="text-gray-700 dark:text-gray-300">
                                      "{word}"
                                    </span>
                                    <div className="flex items-center">
                                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                                        <div
                                          className="h-2 bg-amber-500 rounded-full"
                                          style={{
                                            width: `${Math.min(
                                              100,
                                              count * 8
                                            )}%`,
                                          }}
                                        ></div>
                                      </div>
                                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                                        {count}x
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div> */}
                            </div>

                            {/* Repeated Words */}
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                                Repeated Words
                              </h4>
                              {/* <div className="space-y-2">
                                {Object.entries(
                                  results.keywords.repeatedWords
                                ).map(([word, count]) => (
                                  <div
                                    key={word}
                                    className="flex justify-between items-center"
                                  >
                                    <span className="text-gray-700 dark:text-gray-300">
                                      "{word}"
                                    </span>
                                    <div className="flex items-center">
                                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                                        <div
                                          className="h-2 bg-blue-500 rounded-full"
                                          style={{
                                            width: `${Math.min(
                                              100,
                                              count * 14
                                            )}%`,
                                          }}
                                        ></div>
                                      </div>
                                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                                        {count}x
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div> */}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Readability Section */}
                    <div className="mb-8">
                      <div
                        className="flex items-center justify-between cursor-pointer mb-4"
                        onClick={() => toggleSection("readability")}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-red-600 dark:text-red-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            📖 Readability
                          </h3>
                        </div>
                        {expandedSections.readability ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        )}
                      </div>

                      {expandedSections.readability && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                          {/* Flesch Reading Ease Score */}
                          <div className="mb-6">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Flesch Reading Ease Score
                              </span>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {results.readability.score}/100
                              </span>
                            </div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${getReadabilityColor(
                                  results.readability.score
                                )}`}
                                style={{
                                  width: `${results.readability.score}%`,
                                }}
                              ></div>
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                              <span>Difficult</span>
                              <span>Average</span>
                              <span>Easy</span>
                            </div>
                          </div>

                          {/* Additional Insights */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Word Complexity
                              </h4>
                              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {results.readability.wordComplexity}
                              </p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Sentence Length
                              </h4>
                              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {results.readability.sentenceLength}
                              </p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Reading Level
                              </h4>
                              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {results.readability.level}
                              </p>
                            </div>
                          </div>

                          {/* Detailed Metrics */}
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                              Detailed Metrics
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Flesch-Kincaid Score
                                </p>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">
                                  {results.readability.flesch_score}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Avg. Sentence Length
                                </p>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">
                                  {results.readability.sentence_length} words
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Complex Words
                                </p>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">
                                  {results.readability.word_complexity}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Avg. Word Length
                                </p>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">
                                  {/* {
                                    // results.readability.metrics
                                    //   .averageWordLength
                                  }{" "} */}{" "}
                                  0 characters
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Suggestion */}
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Suggestion for Improvement
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">
                              {results.readability.correction}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Summary Feedback Card */}
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-t-4 border-blue-600 dark:border-blue-500"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Summary Feedback
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              results.readability.score >= 80
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            }`}
                          >
                            {results.readability.level}
                          </span>
                          {results.readability.score > 80 && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-sm font-medium">
                              ✅ Great Readability!
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Feedback Points */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Positive Feedback */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                            <Check className="w-5 h-5 text-green-500 mr-2" />
                            Positive Points
                          </h4>
                          {/* <ul className="space-y-2">
                            {results.summary.positivePoints.map(
                              (point, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-green-500 mr-2">✓</span>
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {point}
                                  </span>
                                </li>
                              )
                            )}
                          </ul> */}
                        </div>

                        {/* Improvement Areas */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                            <AlertCircle className="w-5 h-5 text-amber-500 mr-2" />
                            Areas for Improvement
                          </h4>
                          {/* <ul className="space-y-2">
                            {results.summary.improvements.map(
                              (point, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-amber-500 mr-2">
                                    🔧
                                  </span>
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {point}
                                  </span>
                                </li>
                              )
                            )}
                          </ul> */}
                        </div>
                      </div>

                      {/* Copy Feedback Button */}
                      <div className="flex justify-end mt-6">
                        <button
                          onClick={copyFeedback}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                        >
                          {copied ? (
                            <>
                              <Check size={16} className="text-green-500" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={16} />
                              <span>Copy Feedback</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TextAnalysis;
