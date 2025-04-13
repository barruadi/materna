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

export type QRData = {
    nama: string;
    nik: number;
    tanggalLahir: string;
    golonganDarah: string;
    kontak: number;
    alamat?: string;
    suamiNama: string;
    suamiKontak: number;
    riwayatPenyakit?: string[];
  };