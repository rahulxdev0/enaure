import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './components/home/Home.jsx';
import JewelleryPage from './components/jewellery/JewelleryPage';
import OrganicPage from './components/organic/OrganicPage';
import GreenEnergyPage from './components/green-energy/GreenEnergyPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="jewellery" element={<JewelleryPage />} />
          <Route path="organic" element={<OrganicPage />} />
          <Route path="green-energy" element={<GreenEnergyPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;