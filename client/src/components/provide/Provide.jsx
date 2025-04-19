import React from "react";

// IMAGES DATA
const Aboutdata = [
  {
    imgSrc: "/src/assets/provide/heaking.svg",
    country: "Progress",
    paragraph: "Track your public speaking journey effortlessly",
  },
  {
    imgSrc: "/src/assets/provide/uidesign.svg",
    country: "Analysis",
    paragraph: "AI insights for speech refinement and impact",
  },
  {
    imgSrc: "/src/assets/provide/graphic.svg",
    country: "Feedback",
    paragraph: "Real-time tips for confident and engaging delivery",
  },
  {
    imgSrc: "/src/assets/provide/marketing.svg",
    country: "Chatbot",
    paragraph: "Practice with AI-powered public speaking guidance",
  },
];

const Provide = () => {
  return (
    <div id="services">
      <div className="mx-auto max-w-7xl px-4 my-10 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* COLUMN-1 */}
          <div className="col-span-6 flex justify-center">
            <div className="flex flex-col align-middle justify-center p-10">
              <p className="text-7xl lg:text-7xl pt-4 font-bold leading-[81px] mt-5 text-center lg:text-start">
                Services we offer!
              </p>
              <h4 className="text-lg pt-4 font-normal leading-[33px] text-center lg:text-start text-gray-500">
                ConfidentSpeak offers advanced AI-driven tools for public
                speaking mastery. From analyzing body language to providing
                real-time feedback on tone and pacing, we empower you to
                communicate confidently and captivate any audience.
              </h4>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xl font-medium text-blue-500 flex gap-2 mx-auto lg:mx-0 space-links"
              >
                Buy Premium
                <img
                  src="/src/assets/provide/arrow.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </div>

          <div className="lg:col-span-1"></div>

          {/* COLUMN-2 */}
          <div className="col-span-6 lg:col-span-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10 lg:gap-x-40 px-10 py-12 bg-blue-100 rounded-3xl">
              {Aboutdata.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl lg:-ml-32 p-6 shadow-xl"
                >
                  <img
                    src={item.imgSrc}
                    alt={`Service ${index + 1}`}
                    width={64}
                    height={64}
                    className="mb-5"
                  />
                  <h4 className="text-2xl font-bold">{item.country}</h4>
                  <h4 className="text-lg font-normal text-gray-500 my-2">
                    {item.paragraph}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Provide;
