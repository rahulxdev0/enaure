import Banner from './components/banner/Banner.jsx';
import Brand from './components/brand/Brand.jsx';
import Category from './components/category/Category.jsx';
import NewCollection from './components/newCollection/NewCollection.jsx';
import TopProducts from './components/top-product/TopProducts.jsx';
import TrendingProducts from './components/trending-product/TrendingProducts.jsx';

const JewelleryPage = () => {
  return (
    <>
    <Banner />
    <Category />
    <NewCollection />
    <TopProducts />
    <TrendingProducts />
    <Brand />
    </>
  );
};

export default JewelleryPage;
