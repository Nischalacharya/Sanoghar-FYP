import React, { useState, useEffect } from "react";
import "./Home.scss";
import img1 from "../../assets/carousel/one.jpg";
import img2 from "../../assets/carousel/two.jpg";
import img3 from "../../assets/carousel/three.jpg";
import img4 from "../../assets/carousel/four.jpg";
import img5 from "../../assets/carousel/five.jpg";
export const Carousel = () => {
  const [presentImg, setPresentimg] = useState(0);
  const images = [
    {
      image: img1,
      title: "Your journey begins here",
    },
    {
      image: img2,
      title: "Where affordability meets comfort",
    },
    {
      image: img3,
      title: "Your best choice for student living!",
    },
    {
      image: img4,
      title: "Discover a home",
    },
    {
      image: img5,
      title:
        "Experience comfort beyond compare, where every detail meets your needs",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPresentimg((presentImg + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [presentImg, images.length]);

  const nextImage = () => {
    setPresentimg((presentImg + 1) % images.length);
  };

  const previousImage = () => {
    setPresentimg((presentImg - 1 + images.length) % images.length);
  };
  const selectImage = (index) => {
    setPresentImg(index);
  };
  return (
    <>
      <div className="img-carousel">
        <div className="textOverlay">
          <p className="img-text">{images[presentImg].title}</p>
        </div>
        <div className="buttonOverlay">
          <div>
            <button onClick={previousImage} className="carousel-button">
              <i class="fa-solid fa-less-than"></i>
            </button>
          </div>
          <div>
            <button onClick={nextImage} className="carousel-button">
              <i class="fa-solid fa-greater-than"></i>
            </button>
          </div>
        </div>
        <div className="img-description">
          <img
            src={images[presentImg].image}
            alt="image-carousel"
            className={`carousel-img ${presentImg !== 0 ? "fade-in" : ""}`}
          />
        </div>
        <div className="pagination-dots">
          {images.map((image, index) => (
            <span
              key={index}
              className={`dot ${index === presentImg ? "active" : ""}`}
              onClick={() => selectImage(index)}
            ></span>
          ))}
        </div>
      </div>
    </>
  );
};
