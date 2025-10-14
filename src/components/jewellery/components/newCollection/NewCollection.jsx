import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NewCollection = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const joiceGold = "#C9A236";
  const lightPink = "#FDF2F8";

  const buttonStyle = "inline-block border border-gray-900 text-gray-900 px-4 md:px-8 py-2 md:py-3 uppercase tracking-widest text-xs font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:scale-105";
  const titleStyle = "text-sm md:text-lg lg:text-xl font-bold text-gray-800 uppercase tracking-widest mb-3 md:mb-4 text-center";

  // Simulate loading delay for the color cards effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-8 md:py-16 pt-[20px] px-4 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-xs md:text-sm font-semibold tracking-widest text-gray-500 uppercase">
            Fresh Arrivals
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            NEW COLLECTION
          </h2>
          <div className="mt-2">
            <span className="inline-block w-16 md:w-20 h-1 bg-yellow-600 rounded-full"></span>
            <span className="inline-block w-2 md:w-3 h-1 mx-1 bg-yellow-600 rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-yellow-600 rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Background Waves */}
      <div 
        className="absolute inset-0 z-0 bg-no-repeat bg-center opacity-50 md:opacity-70" 
        style={{ 
          backgroundImage: "url('https://enovathemes.com/joice/wp-content/uploads/waves.svg')", 
          backgroundPosition: 'center bottom',
          backgroundSize: '150% auto'
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Mobile Layout - 2 images per row */}
        <div className="block md:hidden">
          <div className="grid grid-cols-2 gap-4 mb-6">
            
            {/* Top Left - Small Image */}
            <div className="flex justify-center">
              <div className={`relative w-full h-[180px] rounded-lg overflow-hidden transition-all duration-1000 delay-200 ${
                imagesLoaded ? 'opacity-100 transform-none' : 'opacity-0 scale-95'
              }`}>
                {/* Color Card Background */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-700 delay-300 ${
                  imagesLoaded ? 'opacity-0 scale-110' : 'opacity-100'
                }`} 
                  style={{
                    background: `linear-gradient(135deg, ${lightPink}40, ${joiceGold}30)`,
                    backdropFilter: 'blur(10px)'
                  }}
                ></div>
                
                {/* Image */}
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://enovathemes.com/joice/wp-content/uploads/curtain-3.webp"
                  alt="Woman wearing small pendant necklace"
                  className={`object-cover w-full h-full rounded-lg shadow-lg transition-all duration-700 delay-300 ${
                    imagesLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  } hover:scale-110 hover:shadow-2xl cursor-pointer`}
                />
              </div>
            </div>

            {/* Top Right - Small Image */}
            <div className="flex justify-center">
              <div className={`relative w-full h-[180px] rounded-lg overflow-hidden transition-all duration-1000 delay-300 ${
                imagesLoaded ? 'opacity-100 transform-none' : 'opacity-0 scale-95'
              }`}>
                {/* Color Card Background */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-700 delay-500 ${
                  imagesLoaded ? 'opacity-0 scale-110' : 'opacity-100'
                }`} 
                  style={{
                    background: `linear-gradient(135deg, ${joiceGold}25, ${lightPink}35)`,
                    backdropFilter: 'blur(10px)'
                  }}
                ></div>
                
                {/* Image */}
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://enovathemes.com/joice/wp-content/uploads/curtain-5.webp"
                  alt="Woman's hand with ring"
                  className={`object-cover w-full h-full rounded-lg shadow-lg transition-all duration-700 delay-500 ${
                    imagesLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  } hover:scale-110 hover:shadow-2xl cursor-pointer`}
                />
              </div>
            </div>

            {/* Bottom Left - Tall Image */}
            <div className="flex justify-center">
              <div className={`relative w-full h-[220px] rounded-lg overflow-hidden transition-all duration-1000 ${
                imagesLoaded ? 'opacity-100 transform-none' : 'opacity-0 scale-95'
              }`}>
                {/* Color Card Background */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-700 ${
                  imagesLoaded ? 'opacity-0 scale-110' : 'opacity-100'
                }`} 
                  style={{
                    background: `linear-gradient(135deg, ${joiceGold}20, ${lightPink}50)`,
                    backdropFilter: 'blur(10px)'
                  }}
                ></div>
                
                {/* Image */}
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://enovathemes.com/joice/wp-content/uploads/curtain-1.webp"
                  alt="Woman wearing gold necklace and bracelet"
                  className={`object-cover w-full h-full rounded-lg shadow-lg transition-all duration-700 ${
                    imagesLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  } hover:scale-110 hover:shadow-2xl cursor-pointer`}
                />
              </div>
            </div>

            {/* Bottom Right - Tall Image */}
            <div className="flex justify-center">
              <div className={`relative w-full h-[220px] rounded-lg overflow-hidden transition-all duration-1000 delay-500 ${
                imagesLoaded ? 'opacity-100 transform-none' : 'opacity-0 scale-95'
              }`}>
                {/* Color Card Background */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-700 delay-700 ${
                  imagesLoaded ? 'opacity-0 scale-110' : 'opacity-100'
                }`} 
                  style={{
                    background: `linear-gradient(135deg, ${lightPink}45, ${joiceGold}25)`,
                    backdropFilter: 'blur(10px)'
                  }}
                ></div>
                
                {/* Image */}
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://enovathemes.com/joice/wp-content/uploads/curtain-2.webp"
                  alt="Woman wearing black earrings and necklace"
                  className={`object-cover w-full h-full rounded-lg shadow-lg transition-all duration-700 delay-700 ${
                    imagesLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  } hover:scale-110 hover:shadow-2xl cursor-pointer`}
                />
              </div>
            </div>
          </div>

          {/* Mobile Content Sections */}
          <div className="space-y-6 px-2">
            <div className="text-center hidden md:block">
              <h3 className={titleStyle}>
                JEWELRY TELLS A GREAT STORY
              </h3>
              <a href="#" className={buttonStyle}>
                Discover more
              </a>
            </div>
            <div className="text-center">
              <h3 className={titleStyle}>
                DISCOVER NEW ARRIVALS
              </h3>
              <a href="#" className={buttonStyle}>
                Discover more
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          
          {/* 1. Left Tall Image */}
          <div className="lg:col-span-1 flex justify-center order-1">
            <div className={`relative w-full max-w-[450px] h-[600px] lg:h-[500px] rounded-lg overflow-hidden transition-all duration-1000 ${
              imagesLoaded ? 'opacity-100 transform-none' : 'opacity-0 scale-95'
            }`}>
              {/* Color Card Background */}
              <div className={`absolute inset-0 rounded-lg transition-all duration-700 ${
                imagesLoaded ? 'opacity-0 scale-110' : 'opacity-100'
              }`} 
                style={{
                  background: `linear-gradient(135deg, ${joiceGold}20, ${lightPink}50)`,
                  backdropFilter: 'blur(10px)'
                }}
              ></div>
              
              {/* Image */}
              <img
                loading="lazy"
                decoding="async"
                src="https://enovathemes.com/joice/wp-content/uploads/curtain-1.webp"
                alt="Woman wearing gold necklace and bracelet"
                className={`object-cover w-full h-full rounded-lg shadow-lg transition-all duration-700 ${
                  imagesLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                } hover:scale-110 hover:shadow-2xl cursor-pointer`}
                width="450"
                height="700"
              />
            </div>
          </div>

          {/* 2. Middle Left Content */}
          <div className="lg:col-span-1 flex flex-col justify-end items-center order-3 lg:order-2 self-end">
            <div className="relative w-full max-w-[384px] mb-6">
              <div className={`relative h-[300px] rounded-lg overflow-hidden transition-all duration-1000 delay-200 ${
                imagesLoaded ? 'opacity-100 transform-none' : 'opacity-0 scale-95'
              }`}>
                {/* Color Card Background */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-700 delay-300 ${
                  imagesLoaded ? 'opacity-0 scale-110' : 'opacity-100'
                }`} 
                  style={{
                    background: `linear-gradient(135deg, ${lightPink}40, ${joiceGold}30)`,
                    backdropFilter: 'blur(10px)'
                  }}
                ></div>
                
                {/* Image */}
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://enovathemes.com/joice/wp-content/uploads/curtain-3.webp"
                  alt="Woman wearing small pendant necklace"
                  className={`object-cover w-full h-full rounded-lg shadow-lg transition-all duration-700 delay-300 ${
                    imagesLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  } hover:scale-110 hover:shadow-2xl cursor-pointer`}
                  width="384"
                  height="480"
                />
              </div>
            </div>
            <div className="text-center p-4">
              <h3 className={titleStyle}>
                JEWELRY TELLS A GREAT STORY
              </h3>
              <Link to="/view-product" className={buttonStyle}>
                Discover more
              </Link>
            </div>
          </div>

          {/* 3. Middle Right Content */}
          <div className="lg:col-span-1 flex flex-col justify-start items-center order-2 lg:order-3 self-start">
            <div className="text-center p-4 mb-6">
              <h3 className={titleStyle}>
                DISCOVER NEW ARRIVALS
              </h3>
              <Link to="/view-product"className={buttonStyle}>
                Discover more
              </Link>
            </div>
            <div className="relative w-full max-w-[384px]">
              <div className={`relative h-[300px] rounded-lg overflow-hidden transition-all duration-1000 delay-300 ${
                imagesLoaded ? 'opacity-100 transform-none' : 'opacity-0 scale-95'
              }`}>
                {/* Color Card Background */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-700 delay-500 ${
                  imagesLoaded ? 'opacity-0 scale-110' : 'opacity-100'
                }`} 
                  style={{
                    background: `linear-gradient(135deg, ${joiceGold}25, ${lightPink}35)`,
                    backdropFilter: 'blur(10px)'
                  }}
                ></div>
                
                {/* Image */}
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://enovathemes.com/joice/wp-content/uploads/curtain-5.webp"
                  alt="Woman's hand with ring"
                  className={`object-cover w-full h-full rounded-lg shadow-lg transition-all duration-700 delay-500 ${
                    imagesLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  } hover:scale-110 hover:shadow-2xl cursor-pointer`}
                  width="384"
                  height="480"
                />
              </div>
            </div>
          </div>

          {/* 4. Right Tall Image */}
          <div className="lg:col-span-1 flex justify-center order-4">
            <div className={`relative w-full max-w-[512px] h-[600px] lg:h-[500px] rounded-lg overflow-hidden transition-all duration-1000 delay-500 ${
              imagesLoaded ? 'opacity-100 transform-none' : 'opacity-0 scale-95'
            }`}>
              {/* Color Card Background */}
              <div className={`absolute inset-0 rounded-lg transition-all duration-700 delay-700 ${
                imagesLoaded ? 'opacity-0 scale-110' : 'opacity-100'
              }`} 
                style={{
                  background: `linear-gradient(135deg, ${lightPink}45, ${joiceGold}25)`,
                  backdropFilter: 'blur(10px)'
                }}
              ></div>
              
              {/* Image */}
              <img
                loading="lazy"
                decoding="async"
                src="https://enovathemes.com/joice/wp-content/uploads/curtain-2.webp"
                alt="Woman wearing black earrings and necklace"
                className={`object-cover w-full h-full rounded-lg shadow-lg transition-all duration-700 delay-700 ${
                  imagesLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                } hover:scale-110 hover:shadow-2xl cursor-pointer`}
                width="512"
                height="700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCollection;