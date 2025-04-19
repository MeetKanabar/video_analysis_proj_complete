import React from "react";

const Footer = () => {
  // MIDDLE LINKS DATA
  const products = [
    {
      id: 1,
      links: [
        { text: "Home", url: "/" },
        { text: "Services", url: "/#services" },
        { text: "Practice", url: "#about" },
      ],
    },
    {
      id: 2,
      links: [
        { text: "Chat", url: "https://ascend-ai-chatbot.vercel.app/" },
        { text: "Games", url: "/code" },
        { text: "Leaderboard", url: "/leaderboard" },
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-950 to-black -mt-40">
      <div className="mx-auto max-w-2xl pt-48 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="my-24 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
          {/* COLUMN-1 */}
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <div className="overflow-hidden rounded-md h-[60px] w-[250px] bg-white shadow-md shadow-gray-200">
              <img
                src="/src/assets/logo/logo.png"
                alt="logo"
                className="w-full"
                style={{ height: "70px", objectFit: "cover" }}
              />
            </div>

            <div className="flex gap-8 m-8">
              {/* Social Media Icons (Uncomment if needed) */}
              <a href="https://facebook.com" className="footer-fb-icons">
                <img
                  src="/src/assets/footer/facebook.svg"
                  alt="facebook"
                  className="w-[15px] h-[20px]"
                />
              </a>
              <a href="https://twitter.com" className="footer-icons">
                <img
                  src="/src/assets/footer/twitter.svg"
                  alt="twitter"
                  className="w-[20px] h-[20px]"
                />
              </a>
              <a href="https://instagram.com" className="footer-icons">
                <img
                  src="/src/assets/footer/instagram.svg"
                  alt="instagram"
                  className="w-[20px] h-[20px]"
                />
              </a>
            </div>
          </div>

          {/* COLUMN-2/3 */}
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative col-span-2 md:col-span-4 lg:col-span-2"
            >
              <ul>
                {product.links.map((link, index) => (
                  <li key={index} className="mb-5">
                    <a
                      href={link.url}
                      className="text-white text-m font-semibold space-links"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* COLUMN-4 */}
          <div className="col-span-4 md:col-span-4 lg:col-span-4">
            <div className="flex gap-2">
              <img
                src="/src/assets/footer/mask.svg"
                alt="mask-icon"
                className="w-[24px] h-[24px]"
              />
              <h5 className="text-base font-semibold text-gray-300">
                T.Y , Information Technology, DJSCE
              </h5>
            </div>
            <div className="flex gap-2 mt-10">
              <img
                src="/src/assets/footer/telephone.svg"
                alt="telephone-icon"
                className="w-[24px] h-[24px]"
              />
              <h5 className="text-base font-normal text-gray-300">
                +45 34114411
              </h5>
            </div>
            <div className="flex gap-2 mt-10">
              <img
                src="/src/assets/footer/email.svg"
                alt="email-icon"
                className="w-[24px] h-[24px]"
              />
              <h5 className="text-base font-semibold text-gray-300">
                <a
                  href="https://github.com/NS32-oss/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/NS32-oss
                </a>
              </h5>
            </div>
          </div>
        </div>

        <hr className="border-t-2 border-gray-500  opacity-70" />

        {/* All Rights Reserved */}
        <div className="py-10 lg:flex items-center justify-between border-t border-t-bordertop">
          <h4 className="text-gray-300 text-sm text-center lg:text-start font-normal">
            © 2024 Agency. All Rights Reserved by{" "}
            <a href="#" target="_blank" className="underline">
              ConfidentSpeak
            </a>
          </h4>
          <div className="flex items-center gap-5 mt-5 lg:mt-0 justify-center lg:justify-start">
            <h4 className="text-gray-300 text-sm font-normal">
              <a href="/" target="_blank" className="underline">
                Privacy policy
              </a>
            </h4>
            <span className="text-gray-300 text-sm px-1">|</span>
            <h4 className="text-gray-300 text-sm font-normal">
              <a href="/" target="_blank" className="underline">
                Terms & conditions
              </a>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
