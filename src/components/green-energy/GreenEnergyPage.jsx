import React from 'react';
import { Zap } from 'lucide-react';
import DepartmentPage from '../common/DepartmentPage.jsx';

const GreenEnergyPage = () => {
  const categories = [
    { name: 'Solar Panels', count: '45+' },
    { name: 'Wind Turbines', count: '30+' },
    { name: 'Batteries', count: '65+' },
    { name: 'Chargers', count: '80+' },
    { name: 'Inverters', count: '40+' },
  ];

  return (
    <DepartmentPage
      departmentName="Green Energy"
      departmentDescription="Sustainable energy solutions for a greener tomorrow and cleaner environment"
      categories={categories}
      heroColor="from-lime-500 to-green-600"
      icon={Zap}
    />
  );
};

export default GreenEnergyPage;
