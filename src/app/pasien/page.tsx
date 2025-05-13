import React from "react";
import DailyTaskList from "~/app/pasien/daily-task/task-wrapper";
import AdsSlider from "../_components/user/ads-slider";

import { api } from "~/trpc/server";

import { auth } from "~/server/auth";

const App: React.FC = async () => {
  
  const session = await auth();

  const data = await api.task.getTaskByPatientToday({
    pasienId: session?.user.id || "prototipe",
  })

  return (
    <div className="grid grid-cols-1 gap-y-4 w-screen h-fit items-start pb-12">
      {/* Grafik Perkembangan */}
      <div>
        <h2 className="font-bold my-2 text-[16px]">Perkembangan</h2>
        <div className="bg-[#FFF9C2] rounded-lg h-fit">
          <img src="./static-graph.svg" alt="static" className="items-center justify-center w-full"/>
        </div>
      </div>

      {/* Fun Fact */}
      <div className="px-3 py-2 bg-[#FFFDEE] rounded-lg h-fit">
        <b className="text-[13px]">Fakta Unik Hari Ini</b>
        <div className="flex flex-row mt-2 gap-x-2 text-[11px] leading-tight">
          <img src="/ibu-icon.svg" alt="" className="bg-[#FFF9C2] rounded-md"/>
          <p>Banyak ibu hamil mengalami peningkatan sensitivitas penciuman karena perubahan hormon.</p>
        </div>
      </div>

      {/* Daily Task */}
      <div>
        <h2 className="font-bold text-[16px]">Kegiatan Hari Ini</h2>
        <div className="my-1 space-y-2">
          <DailyTaskList
            tanggal={new Date()}
            dailyTask={data ?? []}
          />
        </div>
      </div>

      {/* Rekomendasi Produk */}
      <div>
        <h2 className="font-bold mb-1 text-[16px] pb-2">Rekomendasi Produk</h2>
        <AdsSlider/>
      </div>
    </div>
  );
};

export default App;
