-- DropIndex
DROP INDEX "Pasien_nik_key";

-- CreateTable
CREATE TABLE "Nakes" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "faskesId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nip" INTEGER NOT NULL,
    "fotoProfil" TEXT,
    "kontak" INTEGER NOT NULL,

    CONSTRAINT "Nakes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faskes" (
    "id" TEXT NOT NULL,
    "namaFaskes" TEXT NOT NULL,
    "alamat" TEXT,

    CONSTRAINT "Faskes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Riwayat" (
    "id" TEXT NOT NULL,
    "pasienId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anamnesis" TEXT,
    "beratBadan" DOUBLE PRECISION,
    "tinggiBadan" DOUBLE PRECISION,
    "tekananDarahSistole" DOUBLE PRECISION,
    "tekananDarahDiastole" DOUBLE PRECISION,
    "tinggiFundusUteri" DOUBLE PRECISION,
    "n" TEXT,
    "lingkarLenganAtas" DOUBLE PRECISION,
    "statusGizi" TEXT,
    "refleksPatella" TEXT,
    "denyutJantungJanin" DOUBLE PRECISION,
    "kepalaTerhadapPAP" DOUBLE PRECISION,
    "taksiranBeratJanin" DOUBLE PRECISION,
    "presentasi" TEXT,
    "injeksiTT" DOUBLE PRECISION,
    "catatDiBukuKIA" TEXT,
    "fe" DOUBLE PRECISION,
    "hemoglobin" DOUBLE PRECISION,
    "proteinUrine" DOUBLE PRECISION,
    "gulaDarah" DOUBLE PRECISION,
    "talasemia" TEXT,
    "sifilis" TEXT,
    "hbsAg" TEXT,
    "ibuHamilDenganHIV" TEXT,
    "ibuHamilDitawarkanTes" TEXT,
    "ibuHamilDitesHIV" TEXT,
    "hasilTesHIV" TEXT,
    "ibuHamilMendapatART" TEXT,
    "rdtDarah" TEXT,
    "mikroskopisDarah" TEXT,
    "ibuHamilDiperiksaDahak" TEXT,
    "ibuHamilHasil" TEXT,
    "persalinanPervaginam" TEXT,
    "persalinanPerabdominam" TEXT,
    "ibuHamilDiperiksaKelambu" TEXT,
    "ibuHamilMendapatKinaACT" TEXT,
    "rdtMalaria" TEXT,
    "mikroskopisMalaria" TEXT,
    "ibuHamilDiperiksaAnkilostoma" TEXT,
    "ibuHamilHasilTesAnkilostoma" TEXT,
    "ibuHamilDiperiksaHepatitis" TEXT,
    "ibuHamilHasilTesHepatitis" TEXT,
    "puskesmas" TEXT,
    "rumahBersalin" TEXT,
    "rsiaRsb" TEXT,
    "rumahSakit" TEXT,
    "lainLain" TEXT,
    "keadaanTiba" TEXT,
    "keadaanPulang" TEXT,
    "statusImunisasi" TEXT,
    "konseling" TEXT,
    "risikoTerdeteksiOleh" TEXT,
    "komplikasi" TEXT,
    "tanggalMenstruasiTerakhir" TIMESTAMP(3),
    "tanggalPerkiraanLahir" TIMESTAMP(3),
    "tanggalKontrolKembali" TIMESTAMP(3),

    CONSTRAINT "Riwayat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nakes_email_key" ON "Nakes"("email");

-- AddForeignKey
ALTER TABLE "Nakes" ADD CONSTRAINT "Nakes_faskesId_fkey" FOREIGN KEY ("faskesId") REFERENCES "Faskes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Riwayat" ADD CONSTRAINT "Riwayat_pasienId_fkey" FOREIGN KEY ("pasienId") REFERENCES "Pasien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
