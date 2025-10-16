import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./components/home/Home.jsx";
import JewelleryPage from "./components/jewellery/JewelleryPage";
import OrganicPage from "./components/organic/OrganicPage";
import GreenEnergyPage from "./components/green-energy/GreenEnergyPage";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserProfile from "./components/jewellery/userProfile/UserProfile";
import ViewAndFilterProduct from "./components/jewellery/product-filter/ViewAndFilterProduct.jsx";
import ProductDetail from "./components/jewellery/components/product-detail/ProductDetail";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import Cart from './components/jewellery/cart/Cart'; 
import Checkout from './components/jewellery/checkout/Checkout'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route index element={<JewelleryPage />} />
          <Route path="organic" element={<OrganicPage />} />
          <Route path="green-energy" element={<GreenEnergyPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="view-product" element={<ViewAndFilterProduct />} />
          <Route path="/product/:productSlug" element={<ProductDetail />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="/product/:productSlug" element={<ProductDetail />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
