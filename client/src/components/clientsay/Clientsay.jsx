import React from "react";

const Clientsay = () => {
  return (
    <div className="mx-auto max-w-2xl py-30 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="bg-image-what">
        <h3 className="text-green-950 text-center text-5xl lg:text-6xl font-bold">
          Client Testimonials
        </h3>
        <h4 className="text-lg font-normal text-gray-400 text-center mt-4">
          The ConfidentSpeak Difference
          <br /> in Their Own Words.
        </h4>

        <div className="lg:relative">
          <img
            src="/src/assets/clientsay/avatars.png"
            alt="avatar-image"
            className="hidden lg:block w-auto h-auto"
          />

          <span className="lg:absolute lg:bottom-40 lg:left-80">
            <img
              src="/src/assets/clientsay/user.png"
              alt="user-image"
              width="168"
              height="168"
              className="mx-auto pt-10 lg:pb-10"
            />
            <div className="lg:flex lg:flex-col lg:items-center bg-white rounded-2xl p-5 shadow-sm text-center">
              <p className="text-1xl font-large text-gray-400">
                ConfidentSpeak transformed my interview skills. <br />
                Real-time feedback and a personalized dashboard <br />
                made all the difference. It boosted my confidence!
              </p>
              <h3 className="text-3xl font-semibold py-2">Sunder Pichai</h3>
              <h4 className="text-sm font-normal"></h4>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Clientsay;
