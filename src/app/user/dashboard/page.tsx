import React from "react";
import DailyTaskList from "~/app/pasien/daily-task/task-wrapper";
import AdsSlider from "~/app/_components/user/ads-slider";

const App: React.FC = () => {
  
  return (
    <div className="grid grid-cols-1 gap-y-4 w-screen border h-fit items-start pb-12 pt-[70px]">
      {/* Grafik Perkembangan */}
      <div>
        <h2 className="font-bold">Perkembangan</h2>
        <div className="bg-[#FFF9C2] h-28 rounded-lg">
          grafik
        </div>
      </div>

      {/* Fun Fact */}
      <div className="px-3 py-2 bg-[#FFFDEE] rounded-lg h-fit">
        <b className="text-[13px]">Fakta Unik Hari Ini</b>
        <div className="flex flex-row my-2 gap-x-2 text-[11px] leading-tight">
          <img src="/logo.svg" alt="" />
          <p>Banyak ibu hamil mengalami peningkatan sensitivitas penciuman karena perubahan hormon.</p>
        </div>
      </div>

      {/* Daily Task */}
      <div>
        <h2 className="font-bold">Kegiatan Hari Ini</h2>
        <div className="my-1 space-y-2">
        </div>
      </div>

      {/* Rekomendasi Produk */}
      <div>
        <h2 className="font-bold mb-1">Rekomendasi Produk</h2>
        <AdsSlider/>
      </div>
    </div>
  );
};

export default App;
