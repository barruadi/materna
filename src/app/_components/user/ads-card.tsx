"use client";

import Image from "next/image";

interface AdsCardProps {
  imageUrl: string;
  productName: string;
}

const AdsCard: React.FC<AdsCardProps> = ({ imageUrl, productName }) => {
  return (
    <div className="relative w-24 h-24 rounded-xl bg-[#FFFCE1] shadow-lg overflow-hidden flex flex-col justify-between">
      <div className="absolute top-1 right-1 bg-white px-2 py-0.5 text-[10px] font-medium rounded-full shadow">
        Ads
      </div>

      <div className="flex-grow flex justify-center items-center px-2 pt-2">
        <Image
          src={imageUrl}
          alt={productName}
          width={48}
          height={48}
          className="object-contain"
        />
      </div>

      <div className="bg-[#FDE7B1] text-black text-[10px] font-semibold text-center py-1">
        {productName}
      </div>
  </div>


  );
};

export default AdsCard;