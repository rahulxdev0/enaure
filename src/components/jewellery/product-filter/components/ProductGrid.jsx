import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-3">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
    
    {products.length === 0 && (
      <div className="col-span-full text-center py-16 text-gray-600">
        <div className="text-5xl mb-5">💎</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-sm">
          Try adjusting your search or filter criteria
        </p>
      </div>
    )}
  </div>
);

export default ProductGrid;