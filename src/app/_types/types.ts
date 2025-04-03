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
        title: string;
        description: string;
        isChecked: boolean;
    } [];
};

// History Pasien
export interface HistoryUserProps {
    faskes: string;
    nakes: string;
    resiko: string;
}