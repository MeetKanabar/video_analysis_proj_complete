import React from "react";
import bannerImage from "../../assets/banner/dashboard.svg";

const Banner = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-[75vh] bg-no-repeat bg-center z-[-1]" // Increased height
        style={{
          backgroundImage: `url("/shapes.svg")`,
          backgroundSize: "cover", // Spreads it more without overflowing
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top", // Keeps it positioned well
        }}
      ></div>

      {/* Content */}
      <div className="relative px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-7xl pt-16 sm:pt-20 pb-20 text-center">
          {/* Headline */}
          <h1 className="text-4xl font-bold text-blue-500 sm:text-5xl lg:text-7xl leading-tight">
            Where AI meets <br />
            <span className="text-blue-500">Confident Communication.</span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Elevate your communication, boost your confidence, and unlock your{" "}
            <br /> potential with our comprehensive public speaking platform.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <button className="bg-blue-500 text-white text-xl font-medium px-6 py-3 m-2 rounded-tl-lg rounded-tr-full rounded-bl-full rounded-br-full shadow-md hover:bg-blue-600 transition-all duration-300">
              See our portfolio
            </button>
            <button className="text-blue-500 border border-gray-300 text-xl font-medium px-6 py-3 m-2 rounded-tl-lg rounded-tr-full rounded-bl-full rounded-br-full shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300">
              More info
            </button>
          </div>

          {/* Image */}
          <div className="mt-12">
            <img
              src={bannerImage}
              alt="banner"
              className="mx-auto w-full max-w-6xl"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Banner;
