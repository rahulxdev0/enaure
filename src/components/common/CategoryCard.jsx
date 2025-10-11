import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category, count, image, department }) => {
  return (
    <Link
      to={`/${department}?category=${category.toLowerCase()}`}
      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
            {category}
          </h3>
          <p className="text-gray-600 text-sm">{count} Products</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </Link>
  );
};

export default CategoryCard;
