import { TaskWrapperProps } from "../_types/types";

// Dummy data daily tasks
export const dummyTaskData: TaskWrapperProps = {
    tanggal: new Date(),
    dailyTask: [
        {
            title: "Take prenatal vitamins",
            description: "Take your daily prenatal vitamin",
            isChecked: false,
        },
        {
            title: "Drink 8 glasses of water",
            description: "Stay hydrated throughout the day",
            isChecked: false,
        },
        {
            title: "15-minute gentle stretching",
            description: "Do some light stretching exercises",
            isChecked: false,
        },
        {
            title: "Log any symptoms",
            description: "Record any pregnancy symptoms",
            isChecked: false,
        },
        {
            title: "Eat a balanced meal",
            description: "Include proteins, vegetables",
            isChecked: false,
        },
        {
            title: "Get 8 hours of sleep",
            description: "Ensure you get adequate rest",
            isChecked: false,
        },
    ]
};


import { HistoryUserProps } from "../_types/types";

// Dummy data history pasien
export const dummyHistoryUserData: HistoryUserProps = {
    riwayatId: "1",
    faskes: "Puskesmas A",
    nakes: "Dr. Budi",
    resiko: "Rendah"
}

import { HistoryUserWrapperProps } from "../_types/types";
export const dummyHistoryUserWrapperData: HistoryUserWrapperProps = {
    tanggal: new Date(),
    history: [
        {
            riwayatId: "1",
            faskes: "Puskesmas A",
            nakes: "Dr. Budi",
            resiko: "Rendah"
        },
        {
            riwayatId: "2",
            faskes: "RSUD B",
            nakes: "Dr. Siti",
            resiko: "Sedang"
        },
        {
            riwayatId: "3",
            faskes: "RS C",
            nakes: "Dr. Andi",
            resiko: "Tinggi"
        }
    ]
}