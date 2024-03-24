import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const techData = [
  { id: 1, name: "name", desc: "testi" },
  { id: 2, name: "name", desc: "testi" },
  { id: 3, name: "name", desc: "testi" },
  { id: 4, name: "name", desc: "testi" },
  { id: 5, name: "name", desc: "testi" },
  { id: 6, name: "name", desc: "testi" },
  { id: 7, name: "name", desc: "testi" },
  { id: 8, name: "name", desc: "testi" },
];

function Testimonials() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#090E34] flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-10">Testimonials</h1>
      <Slider {...settings} className="w-[70vw] mx-auto">
        {techData.map((tech) => (
          <div
            key={tech.id}
            className="p-3 text-center hover:scale-105 ease-in-out duration-200"
          >
            <div className="border border-white rounded-xl py-5 cursor-pointer space-y-4">
              <p className="text-lg">{tech.name}</p>
              <p className="text-sm">{tech.desc}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Testimonials;
