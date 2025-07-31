"use client"

import React, { useState } from "react";
import DailyTaskList from "~/app/pasien/daily-task/task-wrapper";
import AdsSlider from "../_components/user/ads-slider";
import TopbarNotification from "../_components/user/notification";

// import { api } from "~/trpc/server";

// import { auth } from "~/server/auth";

import tasks from "~/app/pasien/daily-task/_dummy-task.json"

const App: React.FC = () => {
  
  // const session = await auth();

  const [showNotif, setShowNotif] = useState(false);

  // const data = await api.task.getTaskByPatientToday({
  //   pasienId: session?.user.id || "prototipe",
  // })

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
            dailyTask={tasks[0]}
            onHomePage={true}
          />
        </div>
      </div>

      <div>
        <h2 className="font-bold mb-1 text-[16px] pb-2"></h2>
        <div className="px-3 py-2 bg-[#FFFDEE] rounded-lg h-fit">
          <b className="text-[13px]">Informasi BPJS</b>
          <div className="flex flex-col mt-2 gap-x-2 gap-2 text-[11px] leading-tight">
            <p className="text-justify"> 
              BPJS Kesehatan memberikan jaminan layanan kesehatan komprehensif bagi ibu hamil, 
              mulai dari pemeriksaan kehamilan rutin (antenatal care), persalinan, 
              hingga perawatan pasca-melahirkan.
            </p>
                <a href="https://data.bpjs-kesehatan.go.id/bpjs-portal/action/register.cbi">Daftar Disini</a>
          </div>
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
