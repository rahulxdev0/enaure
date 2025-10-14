import React from 'react';
import PromotionalBanner from './PromotionalBanner';
import './promotional-banner.css';

// --- NEW TANISHQ IMAGES ---
const IMAGES = {
  earrings: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw83758477/homepage/shopByCategory/earrings-cat.jpg',
  weddingRings: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw47da8133/homepage/shopByCategory/rings-cat.jpg',
  necklace: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw63553376/homepage/shopByCategory/pendants-cat.jpg',
  bracelet: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw2562a9fe/homepage/shopByCategory/bracelets-cat.jpg',
};

// --- MAIN COMPONENT ---
const PromotionalSection = () => {
  return (
    <div className="promotional-section-container">
      {/* Left Column */}
      <div className="promotional-banner-column">
        {/* Top Left: New Collection - Wedding Rings (Text first on desktop, Image first on mobile) */}
        <PromotionalBanner
          image={IMAGES.weddingRings}
          subheading="NEW COLLECTION"
          heading="WEDDING RINGS"
          description="Celebrate your love with our stunning collection."
          link="https://enovathemes.com/joice/shop/"
          delay={200}
          imageFirst={false}
          mobileImageFirst={true} // Image first on mobile
        />
        {/* Bottom Left: Elegant Earrings (Image first on desktop, Text first on mobile) */}
        <PromotionalBanner
          image={IMAGES.earrings}
          subheading="TIMELESS BEAUTY"
          heading="ELEGANT EARRINGS"
          description="Discover our exquisite collection of elegant earrings."
          link="https://enovathemes.com/joice/shop/"
          delay={400}
          imageFirst={true}
          mobileImageFirst={false} // Text first on mobile
        />
      </div>

      {/* Right Column */}
      <div className="promotional-banner-column">
        {/* Top Right: Luxury Necklace (Text first on desktop, Image first on mobile) */}
        <PromotionalBanner
          image={IMAGES.necklace}
          subheading="MODERN CHARM"
          heading="LUXURY NECKLACE"
          description="Elevate your elegance with our luxurious necklaces."
          link="https://enovathemes.com/joice/shop/"
          delay={0}
          imageFirst={false}
          mobileImageFirst={true} // Image first on mobile
        />
        {/* Bottom Right: Beautiful Bracelets (Image first on desktop, Text first on mobile) */}
        <PromotionalBanner
          image={IMAGES.bracelet}
          subheading="EXQUISITE DESIGNS"
          heading="BEAUTIFUL BRACELETS"
          description="Adorn your wrists with our stunning bracelet collection."
          link="https://enovathemes.com/joice/shop/"
          delay={400}
          imageFirst={true}
          mobileImageFirst={false} // Text first on mobile
        />
      </div>
    </div>
  );
};

export default PromotionalSection;