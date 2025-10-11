import React from 'react';
import { Leaf } from 'lucide-react';
import DepartmentPage from '../common/DepartmentPage.jsx';

const OrganicPage = () => {
  const categories = [
    { name: 'Food', count: '200+' },
    { name: 'Skincare', count: '85+' },
    { name: 'Supplements', count: '110+' },
    { name: 'Beverages', count: '75+' },
    { name: 'Personal Care', count: '90+' },
  ];

  return (
    <DepartmentPage
      departmentName="Organic Products"
      departmentDescription="Pure, natural, and sustainable organic products for a healthier lifestyle"
      categories={categories}
      heroColor="from-emerald-500 to-teal-600"
      icon={Leaf}
    />
  );
};

export default OrganicPage;
