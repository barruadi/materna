"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import MenuBarUser from "~/app/_components/user/menubar-user";

import { LeftOutlined } from "@ant-design/icons";

function HistoryDetailPage() {
    const router = useRouter();

    const detailId = 1;

    // useEffect fetch data


    const [menuBarOption, setMenuBarOption] = useState<'ibu' | 'anak'>('ibu');
    const [historySection, setHistorySection] = useState();

    const handleToggle = (option: 'ibu' | 'anak') => {
        if (option !== menuBarOption) {
            setMenuBarOption(option);
            switch (option) {
                case 'ibu':
                    setHistorySection();
                case 'anak':
                    setHistorySection();
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Header */}
            <div className="flex w-full p-6 text-xl gap-4">
                <LeftOutlined/>
                Kunjungan ke-{detailId}
            </div>
            <MenuBarUser 
                activeOption={menuBarOption}
                setActiveOption={handleToggle}
            />
        </div>
    )
}

export default HistoryDetailPage;