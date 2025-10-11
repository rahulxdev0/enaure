import React from 'react';
import { Gem } from 'lucide-react';
import DepartmentPage from '../common/DepartmentPage.jsx';
import Banner from './components/banner/Banner.jsx';

const JewelleryPage = () => {
  const categories = [
    { name: 'Rings', count: '120+' },
    { name: 'Necklaces', count: '95+' },
    { name: 'Earrings', count: '150+' },
    { name: 'Bracelets', count: '80+' },
    { name: 'Watches', count: '60+' },
  ];

  return (
    <>
    <Banner />
    <DepartmentPage
      departmentName="Jewellery"
      departmentDescription="Discover our exquisite collection of fine jewellery, from timeless classics to contemporary designs"
      categories={categories}
      heroColor="from-amber-500 to-orange-600"
      icon={Gem}
    />
    </>
  );
};

export default JewelleryPage;
