import React from "react";
import { Link } from "react-router-dom";

const games = [
  {
    title: "Word Explorer",
    description:
      "Enter a word and get its definition, pronunciation, antonyms, and example sentences.",
    path: "/word-explorer",
  },
  {
    title: "Definition Quiz",
    description:
      "Test your knowledge with a quiz of 10-15 word definitions. Choose the right answer!",
    path: "/definition-quiz",
  },
  {
    title: "Pronunciation Check",
    description:
      "Practice and improve your pronunciation by speaking words correctly.",
    path: "/pronunciation-check",
  },
  {
    title: "Speaking Challenge",
    description:
      "Talk for 30 seconds about a given topic and get AI feedback on clarity and fluency.",
    path: "/speaking-challenge",
  },
];

const GamesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-8 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
        Fun Learning Games 🎮
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {games.map((game, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              {game.title}
            </h2>
            <p className="text-gray-700">{game.description}</p>
            <Link
              to={game.path}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Play Now →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
