import React, { useState } from "react";
import BackButton from "../backButton/BackButton"; // Import the BackButton component

const wordsAndDefinitions = {
  serendipity: "The occurrence of events by chance in a happy or beneficial way",
  ephemeral: "Lasting for a very short time",
  aesthetic: "Concerned with beauty or the appreciation of beauty",
  quintessential: "Representing the most perfect or typical example of something",
  elucidate: "To make (something) clear; to explain",
  melancholy: "A feeling of pensive sadness, typically with no obvious cause",
  ineffable: "Too great or extreme to be expressed or described in words",
  gregarious: "Fond of company; sociable",
  ubiquitous: "Present, appearing, or found everywhere",
  vicarious: "Experienced in the imagination through the feelings or actions of another person",
};

const getOptions = (correctDefinition) => {
  const allDefinitions = Object.values(wordsAndDefinitions);
  const options = [correctDefinition];

  while (options.length < 4) {
    const randomOption =
      allDefinitions[Math.floor(Math.random() * allDefinitions.length)];
    if (!options.includes(randomOption)) {
      options.push(randomOption);
    }
  }

  return options.sort(() => Math.random() - 0.5);
};

const DefinitionQuiz = () => {
  const [questions, setQuestions] = useState(Object.entries(wordsAndDefinitions));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const [word, correctDefinition] = currentQuestion;
  const options = getOptions(correctDefinition);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    if (option === correctDefinition) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-16">
      <BackButton /> {/* Add the BackButton component */}
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Definition Quiz 🧠
      </h1>

      {!showResult ? (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center">
            What is the meaning of "<span className="text-blue-600">{word}</span>"?
          </h2>
          <div className="mt-6 space-y-3">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={`w-full px-4 py-2 border rounded-lg text-left ${
                  selectedAnswer
                    ? option === correctDefinition
                      ? "bg-green-500 text-white"
                      : option === selectedAnswer
                      ? "bg-red-500 text-white"
                      : "bg-white"
                    : "bg-white hover:bg-gray-200"
                }`}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold">Quiz Complete! 🎉</h2>
          <p className="text-lg mt-4">
            Your final score: <span className="text-blue-600">{score} / {questions.length}</span>
          </p>
          <button
            onClick={() => {
              setCurrentQuestionIndex(0);
              setScore(0);
              setShowResult(false);
            }}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default DefinitionQuiz;