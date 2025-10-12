import React from "react";

const Loader = () => {
  return (
    <div className="container mx-auto py-8 md:py-13 bg-white">
      <div className="text-center mb-8 md:mb-12 px-4">
        <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-3 md:mb-4 font-serif tracking-wide">
          Shop By Category
        </h2>
      </div>
      <div className="flex justify-center">
        <div className="animate-pulse flex space-x-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-gray-200 rounded-lg mb-2 md:mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
