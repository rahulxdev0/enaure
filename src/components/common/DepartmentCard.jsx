import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DepartmentCard = ({ name, description, icon: Icon, path, image, color }) => {
  return (
    <Link
      to={path}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90`}></div>
      <div className="relative p-8 h-80 flex flex-col justify-between">
        <div>
          <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-3">{name}</h3>
          <p className="text-white/90 text-lg">{description}</p>
        </div>
        <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
          Explore Now
          <ArrowRight className="ml-2 w-5 h-5" />
        </div>
      </div>
    </Link>
  );
};

export default DepartmentCard;
