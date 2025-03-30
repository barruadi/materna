"use client";

import Image from "next/image";

interface AdsCardProps {
  imageUrl: string;
  productName: string;
}

const AdsCard: React.FC<AdsCardProps> = ({ imageUrl, productName }) => {
  return (
    <div className="relative w-48 h-64 rounded-xl bg-[#FFFCE1] shadow-lg overflow-hidden">
      <div className="absolute top-3 right-3 bg-white px-3 py-1 text-sm font-medium rounded-full shadow">
        Ads
      </div>

      <div className="flex justify-center items-center h-3/4">
        <Image src={imageUrl} alt={productName} width={120} height={120} className="object-contain" />
      </div>

      <div className="bg-[#FDE7B1] text-black text-lg font-semibold text-center py-3">
        {productName}
      </div>
    </div>
  );
};

export default AdsCard;
