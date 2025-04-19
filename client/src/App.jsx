import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import AudioAnalysis from "./components/AudioAnalysis";
import Banner from "./components/banner/Banner";
import Navbar from "./components/navbar/Navbar";
import Companies from "./components/companies/Companies";
import Provide from "./components/provide/Provide";
import Why from "./components/why/Why";
import Network from "./components/network/Network";
import Clientsay from "./components/clientsay/Clientsay";
import Newsletter from "./components/newsletter/Newsletter";
import Footer from "./components/footer/Footer";
import AnalysisPage from "./components/practice/Practice";
import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import GamesPage from "./components/games/Games";
import DefinitionQuiz from "./components/games/Game2";
import WordExplorer from "./components/games/Game1";
import PronunciationCheck from "./components/games/Game3";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Banner />
                  <Companies />
                  <Provide />
                  <Why />
                  <Network />
                  <Clientsay />
                  <Newsletter />
                  <Footer />
                </>
              }
            />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/practice" element={<AnalysisPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            {/* <Route path="/video" element={<VideoAnalysis />} /> */}
            <Route path="/audio" element={<AudioAnalysis />} />
            {/* <Route path="/text" element={<TextAnalysis />} /> */}
            <Route path="/word-explorer" element={<WordExplorer />} />
            <Route path="/pronunciation-check" element={<PronunciationCheck />} />            
            <Route path="/definition-quiz" element={<DefinitionQuiz />} /> {/* Add the new route */}
          </Routes>
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;