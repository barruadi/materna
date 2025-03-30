"use client";

import { type FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import AdsCard from "./ads-card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Add custom styles for pagination
import { useEffect } from "react";

interface ProductAd {
  id: number;
  imageUrl: string;
  productName: string;
}

const productAds: ProductAd[] = [
  { id: 1, imageUrl: "/product1.png", productName: "Product A" },
  { id: 2, imageUrl: "/product2.png", productName: "Product B" },
  { id: 3, imageUrl: "/product3.png", productName: "Product C" },
];

const AdsSlider: FC = () => {
  // Add custom CSS for pagination bullets
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .custom-pagination .swiper-pagination-bullet {
        background: #FDE7B1;
        opacity: 0.5;
      }
      .custom-pagination .swiper-pagination-bullet-active {
        background: #FDE7B1;
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    }
  }, []);

  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={10} // Reduced space between slides
        slidesPerView={1.8} // Increased slides per view to show more products
        pagination={{ 
          clickable: true,
          el: '.custom-pagination',
        }}
        modules={[Pagination]}
        className="w-full px-4"
      >
        {productAds.map((product) => (
          <SwiperSlide key={product.id}>
            <AdsCard imageUrl={product.imageUrl} productName={product.productName} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Pagination Container with more space */}
      <div className="custom-pagination mt-6 flex justify-center"></div>
    </div>
  );
};

export default AdsSlider;