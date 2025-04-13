"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { QRData } from "~/app/_types/types";

export default function ScanQRPage() {
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (scanned) return;

    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    }, false);

    scanner.render(
      async (decodedText: string) => {
        console.log("Scanned:", decodedText);
        setScanned(true);

        try {
          const url = new URL(decodedText);
          const sessionId = url.searchParams.get("session") || decodedText;

          // fetch data from user
          const data: QRData & { sessionId: string } = {
            sessionId,
            nama: 'Siti Aminah',
            nik: 1234567890123456,
            tanggalLahir: "1990-06-15",
            golonganDarah: 'O',
            kontak: 123456,
            alamat: 'Jl. Kenanga No. 5',
            suamiNama: 'Budi',
            suamiKontak: 123456,
            riwayatPenyakit: ['Asma', 'Diabetes'],
          };

          await fetch("/api/pasien/scan-qr", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          console.log(data);
          console.log(data.sessionId);

          alert("Data dikirim ke tenaga kesehatan!");
          
          // kembali ke profile
          router.push('/pasien/profile');

        } catch (err) {
          console.error("Something went wrong:", err);
        }

        scanner.clear().catch(console.error);
      },
      (error) => {
        console.warn("Scan failed:", error);
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [scanned]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center border-2 rounded-lg shadow-md">
            <p className="text-center my-4">Pindai kode QR pada komputer</p>  
            <div id="reader" className="mx-auto" style={{ width: 300 }}></div>
        </div>
    </div>
  );
}
