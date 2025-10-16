import React, { useState, useEffect } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import useMobileCheck from '../../../../hooks/useMobileCheck'; 

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMobileCheck();

  // Mock data - replace with actual API calls
  const mockWishlist = [
    { 
      id: 1, 
      name: 'Beautiful Gold Necklace with Diamond', 
      price: 29.99, 
      salePrice: 24.99, 
      image: null,
      category: 'Necklaces',
      rating: 4.5,
      reviewsCount: 124,
      isFeatured: true
    },
    { 
      id: 2, 
      name: 'Silver Bracelet Collection', 
      price: 49.99, 
      image: null,
      category: 'Bracelets',
      rating: 4.2,
      reviewsCount: 89,
      isFeatured: false
    },
    { 
      id: 3, 
      name: 'Elegant Pearl Earrings', 
      price: 19.99, 
      salePrice: 15.99, 
      image: null,
      category: 'Earrings',
      rating: 4.8,
      reviewsCount: 203,
      isFeatured: true
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        setTimeout(() => {
          setWishlist(mockWishlist);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      // Replace with actual API call
      // await api.delete(`/wishlist/${productId}`);
      
      setWishlist(wishlist.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleAddToCart = async (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      // Replace with actual API call
      // await api.post('/cart', { productId });
      
      console.log(`Added product ${productId} to cart`);
      // Optionally show success message
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Product Card Component for Wishlist
  const WishlistProductCard = ({ product }) => (
    <div 
      key={product.id} 
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200 
        hover:shadow-md hover:border-yellow-500 transition-all duration-300 
        text-center relative group flex flex-col
        ${isMobile ? 'w-full' : 'w-48 flex-shrink-0'}
      `}
      style={{ 
        minHeight: '320px',
        maxHeight: '320px',
        width: isMobile ? '100%' : '230px'
      }}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.salePrice && (
          <span className="bg-yellow-300 text-yellow-800 text-xs px-2 py-1 rounded">
            Sale
          </span>
        )}
        {product.isFeatured && (
          <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>

      {/* Remove Button - Top Right */}
      <div className="absolute top-2 right-2 z-10">
        <button 
          className={`
            w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm
            ${isMobile 
              ? 'bg-white text-red-500 shadow-sm' 
              : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white shadow-sm'
            }
          `}
          onClick={(e) => handleRemoveFromWishlist(product.id, e)}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image */}
      <div className="p-3 flex-1 flex items-center justify-center">
        <div 
          className="image-container flex items-center justify-center overflow-hidden"
          style={{ 
            height: '150px', 
            width: '150px'
          }}
        >
          {product.image ? (
            <img 
              loading="lazy"
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain"
              style={{ 
                height: '150px',
                width: '150px',
                objectFit: 'contain'
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
              <span className="text-sm">Product Image</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 pt-0 flex flex-col flex-1 justify-end">
        <h3 className="text-sm font-medium text-gray-700 line-clamp-2 leading-tight min-h-[2.5rem]">
          {product.name}
        </h3>
        
        <div className="flex justify-center items-center mb-1">
          <div className="star-rating inline-block relative text-gray-300 text-sm">
            <span 
              className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-yellow-400"
              style={{ width: `${((product.rating || 4) / 5) * 100}%` }}
            >
              ★★★★★
            </span>
            ★★★★★
          </div>
          {product.reviewsCount > 0 && (
            <span className="text-sm text-gray-500 ml-1">({product.reviewsCount})</span>
          )}
        </div>
        
        <div className="mb-3">
          {product.salePrice ? (
            <>
              <span className="text-lg font-semibold text-yellow-600">
                ${product.salePrice}
              </span>
              <span className="text-lg text-gray-500 line-through ml-2">
                ${product.price}
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold text-yellow-600">
              ${product.price}
            </span>
          )}
        </div>
        
        <button 
          onClick={(e) => handleAddToCart(product.id, e)}
          className={`
            bg-gradient-to-r mb-6 from-yellow-200 to-yellow-400 text-black text-xs font-semibold 
            w-full py-2 rounded-lg uppercase transition-all duration-300 
            hover:from-yellow-300 hover:to-yellow-500 hover:shadow-md
            active:from-yellow-300 active:to-yellow-500 active:shadow-md
            flex items-center justify-center gap-2
          `}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center -mt-80">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        {/* <div className="flex flex-col items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">My Wishlist</h2>
          <div className="flex items-center space-x-1 mb-2">
            <span className="inline-block w-16 md:w-20 h-1 bg-yellow-600 rounded-full"></span>
            <span className="inline-block w-2 md:w-3 h-1 bg-yellow-600 rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-yellow-600 rounded-full"></span>
          </div>
          <p className="text-gray-600 text-center">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </div> */}

        {/* Wishlist Items */}
        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-4xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">
                Start adding items you love to your wishlist. They'll appear here!
              </p>
              <button 
                onClick={() => window.history.back()}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className={`flex justify-center ${isMobile ? 'px-4' : 'px-0'}`}>
            <div className="flex gap-6 justify-center flex-wrap max-w-7xl">
              {wishlist.map((product) => (
                <WishlistProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;










// import React, { useState, useEffect } from 'react';
// import { X, ShoppingCart, Gem } from 'lucide-react';
// import useMobileCheck from '../../../../hooks/useMobileCheck'; 

// const Wishlist = () => {
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const isMobile = useMobileCheck();

//   // Mock data - replace with actual API calls
//   const mockWishlist = [
//     { 
//       id: 1, 
//       name: 'Eternal Diamond Solitaire Necklace', 
//       price: 1299.99, 
//       salePrice: 1099.99, 
//       image: null,
//       category: 'Diamond Necklaces',
//       rating: 4.8,
//       reviewsCount: 124,
//       material: 'White Gold',
//       stones: 'Diamond'
//     },
//     { 
//       id: 2, 
//       name: 'Vintage Pearl & Gold Bracelet', 
//       price: 899.99, 
//       image: null,
//       category: 'Pearl Bracelets',
//       rating: 4.6,
//       reviewsCount: 89,
//       material: 'Yellow Gold',
//       stones: 'Pearl'
//     },
//     { 
//       id: 3, 
//       name: 'Art Deco Emerald Earrings', 
//       price: 1599.99, 
//       salePrice: 1399.99, 
//       image: null,
//       category: 'Emerald Earrings',
//       rating: 4.9,
//       reviewsCount: 203,
//       material: 'Platinum',
//       stones: 'Emerald'
//     },
//   ];

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       setLoading(true);
//       try {
//         setTimeout(() => {
//           setWishlist(mockWishlist);
//           setLoading(false);
//         }, 500);
//       } catch (error) {
//         console.error('Error fetching wishlist:', error);
//         setLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, []);

//   const handleRemoveFromWishlist = async (productId, e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     try {
//       setWishlist(wishlist.filter(item => item.id !== productId));
//     } catch (error) {
//       console.error('Error removing from wishlist:', error);
//     }
//   };

//   const handleAddToCart = async (productId, e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     try {
//       console.log(`Added product ${productId} to cart`);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   // Product Card Component for Wishlist - Updated like TopProducts
//   const WishlistProductCard = ({ product }) => (
//     <div 
//       key={product.id} 
//       className={`
//         bg-white rounded-lg shadow-sm border border-gray-200 
//         hover:shadow-md hover:border-amber-500 transition-all duration-300 
//         text-center relative group flex flex-col
//         ${isMobile ? 'w-full' : 'w-48 flex-shrink-0'}
//       `}
//       style={{ 
//         minHeight: '320px',
//         maxHeight: '320px',
//         width: isMobile ? '100%' : '230px'
//       }}
//     >
//       {/* Remove Button - Top Right with black bg and white text on hover */}
//       <div className="absolute top-2 right-2 z-10">
//         <button 
//           className={`
//             w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm
//             bg-white text-gray-600 hover:bg-black hover:text-white border border-gray-200
//             transform hover:scale-110
//           `}
//           onClick={(e) => handleRemoveFromWishlist(product.id, e)}
//         >
//           <X className="w-4 h-4" />
//         </button>
//       </div>

//       {/* Product Image - Updated like TopProducts */}
//       <div className="p-3 flex-1 flex items-center justify-center">
//         <div 
//           className="image-container flex items-center justify-center overflow-hidden"
//           style={{ 
//             height: '150px', 
//             width: '150px'
//           }}
//         >
//           {product.image ? (
//             <img 
//               loading="lazy"
//               src={product.image} 
//               alt={product.name} 
//               className="max-h-full max-w-full object-contain"
//               style={{ 
//                 height: '150px',
//                 width: '150px',
//                 objectFit: 'contain'
//               }}
//               onError={(e) => {
//                 e.target.src = 'https://via.placeholder.com/150?text=Product';
//               }}
//             />
//           ) : (
//             <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 flex flex-col items-center justify-center text-amber-600 rounded-lg border-2 border-amber-200">
//               <Gem className="w-12 h-12 mb-2 text-amber-400" />
//               <span className="text-xs font-medium text-amber-600">JEWELLERY</span>
//               <span className="text-xs text-amber-500 mt-1">{product.category}</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Product Info */}
//       <div className="p-3 pt-0 flex flex-col flex-1 justify-end">
//         <div className="mb-2">
//           <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
//             {product.material}
//           </span>
//         </div>
        
//         <h3 className="text-sm font-medium text-gray-700 line-clamp-2 leading-tight min-h-[2.5rem]">
//           {product.name}
//         </h3>
        
//         <div className="flex justify-center items-center mb-1">
//           <div className="star-rating inline-block relative text-gray-300 text-sm">
//             <span 
//               className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-amber-400"
//               style={{ width: `${((product.rating || 4) / 5) * 100}%` }}
//             >
//               ★★★★★
//             </span>
//             ★★★★★
//           </div>
//           {product.reviewsCount > 0 && (
//             <span className="text-sm text-gray-500 ml-1">({product.reviewsCount})</span>
//           )}
//         </div>
        
//         <div className="mb-3">
//           {product.salePrice ? (
//             <div className="flex items-center justify-center space-x-2">
//               <span className="text-lg font-bold text-amber-600">
//                 ${product.salePrice}
//               </span>
//               <span className="text-sm text-gray-400 line-through">
//                 ${product.price}
//               </span>
//               <span className="text-xs font-semibold text-red-500 bg-red-50 px-1 rounded">
//                 SAVE ${(product.price - product.salePrice).toFixed(2)}
//               </span>
//             </div>
//           ) : (
//             <span className="text-lg font-bold text-amber-600">
//               ${product.price}
//             </span>
//           )}
//         </div>
        
//         <button 
//           onClick={(e) => handleAddToCart(product.id, e)}
//           className={`
//             bg-gradient-to-r mb-6 from-amber-500 to-amber-600 text-white text-xs font-bold 
//             w-full py-2 rounded-lg uppercase transition-all duration-300 
//             hover:from-amber-600 hover:to-amber-700 hover:shadow-md
//             active:from-amber-600 active:to-amber-700 active:shadow-md
//             flex items-center justify-center gap-2
//           `}
//         >
//           <ShoppingCart className="w-4 h-4" />
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-amber-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading your precious collection...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white to-amber-50">
//       {/* Header Section */}
//       <div className="bg-white border-b border-amber-200">
//         <div className="max-w-6xl mx-auto px-6 py-8">
//           <div className="text-center">
//             <div className="flex items-center justify-center gap-4 mb-4">
//               <Gem className="w-8 h-8 text-amber-600" />
//               <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
//                 Your Wishlist
//               </h1>
//             </div>
//             <div className="flex items-center justify-center space-x-2 mb-4">
//               <span className="inline-block w-16 h-1 bg-amber-600 rounded-full"></span>
//               <span className="inline-block w-4 h-1 bg-amber-600 rounded-full"></span>
//               <span className="inline-block w-2 h-1 bg-amber-600 rounded-full"></span>
//             </div>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//               Your curated collection of exquisite jewellery pieces waiting to become yours.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Wishlist Content */}
//       <div className="max-w-7xl mx-auto p-6">
//         {wishlist.length === 0 ? (
//           <div className="text-center py-20">
//             <div className="max-w-md mx-auto">
//               <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center shadow-lg">
//                 <Gem className="w-12 h-12 text-amber-500" />
//               </div>
//               <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Your wishlist sparkles with potential</h3>
//               <p className="text-gray-600 mb-8 leading-relaxed">
//                 Discover exquisite jewellery pieces and save them here for later. Your perfect piece is waiting to be found.
//               </p>
//               <button 
//                 onClick={() => window.history.back()}
//                 className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
//               >
//                 Explore Collection
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className={`flex justify-center ${isMobile ? 'px-4' : 'px-0'}`}>
//             <div className="flex gap-6 justify-center flex-wrap max-w-7xl">
//               {wishlist.map((product) => (
//                 <WishlistProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Wishlist;