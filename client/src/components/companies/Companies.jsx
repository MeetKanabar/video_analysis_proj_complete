import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// IMAGES DATA FOR CAROUSEL
const data = [
  { imgSrc: "/src/assets/carousel/google.svg" },
  { imgSrc: "/src/assets/carousel/microsoft.webp" },
  { imgSrc: "/src/assets/carousel/accenture.png" },
  { imgSrc: "/src/assets/carousel/tata.png" },
  { imgSrc: "/src/assets/carousel/uber.png" },
  { imgSrc: "/src/assets/carousel/garnier.png" },
  { imgSrc: "/src/assets/carousel/slack.png" },
  { imgSrc: "/src/assets/carousel/udemy.png" },
  { imgSrc: "/src/assets/carousel/amazon.svg" },
  { imgSrc: "/src/assets/carousel/tesla.jpg" },
  { imgSrc: "/src/assets/carousel/flipkart.png" },
  { imgSrc: "/src/assets/carousel/icici.png" },
  { imgSrc: "/src/assets/carousel/wipro.svg" },
];

// CAROUSEL SETTINGS
export default class Companies extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: { slidesToShow: 4, slidesToScroll: 1, infinite: true, dots: false },
        },
        {
          breakpoint: 700,
          settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true, dots: false },
        },
        {
          breakpoint: 500,
          settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: false },
        },
      ],
    };

    return (
      <div className="text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="py-14">
            <Slider {...settings}>
              {data.map((item, index) => (
                <div key={index}>
                  <img src={item.imgSrc} alt={`Company logo ${index + 1}`} width={150} height={150} />
                </div>
              ))}
            </Slider>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}