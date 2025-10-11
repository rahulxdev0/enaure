import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { slidesData } from "./slideData";
import FloatingDots from "./FloatingDots";
import "../banner/banner.css";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slide = slidesData[currentSlide];
  const timeoutRef = useRef(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNextSlide();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleNextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const nextSlide =
      currentSlide === slidesData.length - 1 ? 0 : currentSlide + 1;

    timeoutRef.current = setTimeout(() => {
      setCurrentSlide(nextSlide);
      setIsAnimating(false);
    }, 1000); // Match this with the longest animation duration
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const prevSlide =
      currentSlide === 0 ? slidesData.length - 1 : currentSlide - 1;

    timeoutRef.current = setTimeout(() => {
      setCurrentSlide(prevSlide);
      setIsAnimating(false);
    }, 1000);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <>
      <section className="relative w-full h-[350px] md:h-[600px] overflow-hidden mt-[-8px] md:mt-[-15px] bg-gradient-to-br from-[#f8f5f2] to-[#f0e6d8]">
        <FloatingDots />

        {/* Wave Background Effect */}
        <div className="absolute inset-0 z-5">
          {/* Main background color */}
          <div
            className="absolute inset-0 transition-colors duration-700"
            style={{ backgroundColor: slide.bgColor }}
          />

          {/* Thin Background Wave 1 */}
          <svg
            className="absolute bottom-0 left-0 w-full h-12 md:h-20 animate-thin-wave-1 opacity-60"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="fill-current text-white/50"
            />
          </svg>

          {/* Thin Background Wave 2 */}
          <svg
            className="absolute bottom-0 left-0 w-full h-10 md:h-16 animate-thin-wave-2 opacity-40"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              className="fill-current text-white/40"
            />
          </svg>
        </div>

        {/* Product/Model Image with right-to-left animation */}
        <div className="absolute right-[-10%] md:right-0 top-0 h-full w-auto max-w-[65%] md:max-w-[70%] overflow-hidden z-20">
          <img
            src={slide.image}
            alt={`Jewelry for ${slide.title}`}
            className={`h-full w-auto object-cover object-left md:object-right ${
              !isAnimating ? "animate-image-slide" : ""
            }`}
            style={{
              transformOrigin: "right center",
            }}
          />
        </div>

        {/* Content Area with staggered text animations */}
        <div className="container mx-auto px-3 md:px-4 h-full flex items-center relative z-30">
          <div
            className={`text-left max-w-[240px] md:max-w-lg ml-4 md:ml-20 ${
              !isAnimating ? "animate-text-slide" : ""
            }`}
          >
            {/* Category */}
            <span
              className={`inline-block text-gray-500 uppercase text-[8px] md:text-sm font-light mb-1.5 md:mb-4 tracking-[0.15em] md:tracking-[0.2em] font-sans ${
                !isAnimating ? "animate-category" : ""
              }`}
            >
              {slide.category}
            </span>

            {/* Title & Highlight */}
            <div className={!isAnimating ? "animate-title" : ""}>
              <h1 className="text-2xl md:text-6xl leading-tight font-normal uppercase mb-2 md:mb-6 text-gray-900 font-serif tracking-tight">
                <span className="block font-light mb-1 md:mb-2">{slide.title}</span>
              </h1>
            </div>

            <div className={!isAnimating ? "animate-highlight" : ""}>
              <span className="block text-[#b8860b] font-medium text-xl md:text-5xl mb-2 md:mb-6">
                {slide.highlight}
              </span>
            </div>

            {/* Description */}
            <p
              className={`text-[9px] md:text-base leading-relaxed mb-3 md:mb-8 text-gray-600 font-normal max-w-[220px] md:max-w-md font-sans ${
                !isAnimating ? "animate-description" : ""
              }`}
            >
              {slide.description}
            </p>

            {/* Shop Now Button */}
            <div className={!isAnimating ? "animate-button" : ""}>
              <Link
                to={slide.link}
                className="inline-flex items-center justify-center gap-1 md:gap-2 bg-gray-900 text-white px-3 py-1.5 md:px-8 md:py-4 font-medium text-[8px] md:text-sm uppercase tracking-wider transition-all duration-300 hover:bg-gray-800 hover:shadow-lg group"
              >
                <Sparkles className="w-2.5 h-2.5 md:w-4 md:h-4 group-hover:rotate-12 transition-transform duration-300" />
                {slide.linkText}
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute left-2 md:left-10 top-1/2 transform -translate-y-1/2 z-40">
          <button
            onClick={handlePrevSlide}
            disabled={isAnimating}
            className="bg-white/80 backdrop-blur-sm text-gray-800 border border-gray-200 p-1.5 md:p-3 rounded-full hover:bg-white hover:border-gray-300 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-3 h-3 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="absolute right-2 md:right-10 top-1/2 transform -translate-y-1/2 z-40">
          <button
            onClick={handleNextSlide}
            disabled={isAnimating}
            className="bg-white/80 backdrop-blur-sm text-gray-800 border border-gray-200 p-1.5 md:p-3 rounded-full hover:bg-white hover:border-gray-300 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-3 h-3 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Banner Indicators (Dots) */}
        <div className="absolute bottom-3 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1.5 md:gap-3 z-40">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-[#b8860b] shadow-lg scale-125" // Dark golden for active dot
                  : "bg-white/80 hover:bg-white backdrop-blur-sm"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Banner;
