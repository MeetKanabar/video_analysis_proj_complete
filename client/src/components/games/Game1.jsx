import React, { useState } from "react";
import BackButton from "../backButton/BackButton"; // Import the BackButton component

const WordExplorer = () => {
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWordData = async () => {
    if (!word.trim()) return;
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(`http://localhost:5000/word-explorer/${word}`);
      const result = await response.json();

      if (response.ok) {
        setData(result);
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <BackButton /> {/* Add the BackButton component */}
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Word Explorer 📖</h1>

      <div className="flex space-x-2">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word..."
          className="px-4 py-2 border rounded-lg focus:outline-none"
        />
        <button
          onClick={fetchWordData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Explore
        </button>
      </div>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {data && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg max-w-lg">
          <h2 className="text-2xl font-bold text-blue-700">{data.word}</h2>
          
          {/* Pronunciation Audio */}
          {data.audio && (
            <audio controls className="mt-4">
              <source src={`http://localhost:5000${data.audio}`} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          )}

          {/* Definitions */}
          {data.definitions && data.definitions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Definitions:</h3>
              <ul className="list-disc ml-6 text-gray-700">
                {data.definitions.map((def, index) => (
                  <li key={index}>{def}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Synonyms */}
          {data.synonyms && data.synonyms.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Synonyms:</h3>
              <p className="text-gray-700">{data.synonyms.join(", ")}</p>
            </div>
          )}

          {/* Antonyms */}
          {data.antonyms && data.antonyms.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Antonyms:</h3>
              <p className="text-gray-700">{data.antonyms.join(", ")}</p>
            </div>
          )}

          {/* Example Sentences */}
          {data.examples && data.examples.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Example Sentences:</h3>
              <ul className="list-disc ml-6 text-gray-700">
                {data.examples.map((ex, index) => (
                  <li key={index}>{ex}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WordExplorer;