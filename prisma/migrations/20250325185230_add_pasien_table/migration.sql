-- CreateTable
CREATE TABLE "Pasien" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "nik" INTEGER NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "fotoProfil" TEXT,
    "golonganDarah" TEXT NOT NULL,

    CONSTRAINT "Pasien_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pasien_email_key" ON "Pasien"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pasien_nik_key" ON "Pasien"("nik");
