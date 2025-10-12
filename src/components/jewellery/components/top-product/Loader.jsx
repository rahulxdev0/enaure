import React from "react";

const Loader = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            TOP PRODUCTS
          </h2>
          <div className="flex items-center space-x-1 mb-2">
            <span className="inline-block w-16 md:w-20 h-1 bg-yellow-600 rounded-full"></span>
            <span className="inline-block w-2 md:w-3 h-1 bg-yellow-600 rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-yellow-600 rounded-full"></span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="animate-pulse flex space-x-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-48 h-48 bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loader;
