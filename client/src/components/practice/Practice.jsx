import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const AnalysisPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        {/* Page Title */}
        <h2 className="text-4xl font-semibold text-blue-600 text-center mb-12">
          Choose an Analysis Type
        </h2>

        {/* Three Analysis Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Video Analysis */}
          <div
            className="bg-blue-800 hover:bg-blue-800 transition-all text-white rounded-xl p-10 flex flex-col items-center shadow-lg"
            onClick={() => navigate("/video")}
          >
            <img
              src="src/assets/practice/icons8-video-50.png"
              alt="Video Analysis"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-2xl font-medium">Video Analysis</h3>
            <p className="text-gray-300 text-center mt-2">
              Analyze your speech using video insights.
            </p>
          </div>

          {/* Audio Analysis */}
          <div
            className="bg-blue-800 hover:bg-blue-800 transition-all text-white rounded-xl p-10 flex flex-col items-center shadow-lg"
            onClick={() => navigate("/audio")}
          >
            <img
              src="src/assets/practice/icons8-audio-50.png"
              alt="Audio Analysis"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-2xl font-medium">Audio Analysis</h3>
            <p className="text-gray-300 text-center mt-2">
              Get feedback on your speech clarity and tone.
            </p>
          </div>

          {/* Text Analysis */}
          <div
            className="bg-blue-800 hover:bg-blue-800 transition-all text-white rounded-xl p-10 flex flex-col items-center shadow-lg"
            onClick={() => navigate("/text")}
          >
            <img
              src="src/assets/practice/icons8-text-50.png"
              alt="Text Analysis"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-2xl font-medium">Text Analysis</h3>
            <p className="text-gray-300 text-center mt-2">
              Evaluate your speech content and grammar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
