// Daily Tasks
export interface TaskItemProps {
    title: string;
    description: string;
    isChecked: boolean;
    onToggle: () => void;
}

export interface TaskWrapperProps {
    tanggal: Date;
    dailyTask: {
        id: string;
        title: string;
        description: string;
        status: boolean;
    } [];
};

export interface DailyTaskProps {
    id: string;
    title: string;
    description: string;
    status: boolean;
}

// History Pasien
export interface HistoryUserProps {
    riwayatId: string;
    faskes: string;
    nakes: string;
    resiko: string;
}

export interface HistoryUserWrapperProps {
    tanggal: Date;
    history: HistoryUserProps[];
}



// ------------------COMPONENTS------------------
// Menu Bar User
export type MenuBarUserProps = {
    activeOption: "ibu" | "anak";
    setActiveOption: (option: "ibu" | "anak") => void;
}

// Header User
export interface HeaderUserProps {
    title?: string;
}