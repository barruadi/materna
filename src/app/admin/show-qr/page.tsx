'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

type QRData = {
  nama: string;
  nik: number;
  tanggalLahir: string;
  golonganDarah: string;
  kontak: number;
  alamat: string;
  suamiNama: string;
  suamiKontak: number;
  riwayatPenyakit: string[];
};

export default function ShowQR() {
  const [qr, setQr] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [receivedData, setReceivedData] = useState<QRData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const id = uuidv4();
    setSessionId(id);
    QRCode.toDataURL(`${window.location.origin}/mobile?session=${id}`)
      .then(setQr)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`/api/nakes/show-qr?session=${sessionId}`);
      const json = await res.json();

      if (json.received) {
        setReceivedData(json.data);
        clearInterval(interval);

        // Show data for 2 seconds before redirecting
        setTimeout(() => {
          router.push(`/admin/tambah-pasien?session=${sessionId}`);
        }, 2000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center border border-gray-200">
        <h1 className="text-2xl font-semibold mb-6">Arahkan QR pada Perangkat Pasien</h1>

        {qr && (
          <img
            src={qr}
            alt="QR Code"
            className="mx-auto mb-4 w-48 h-48 object-contain"
          />
        )}

        {/* <p className="text-sm text-gray-600 mb-6">
          <span className="font-medium text-gray-800">Session ID:</span> {sessionId}
        </p> */}

        {receivedData && (
          <div className="mt-6 text-left bg-gray-100 p-4 rounded-md w-full overflow-x-auto">
            <h2 className="text-lg font-semibold text-green-600 mb-2">Data Diterima!</h2>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
              {JSON.stringify(receivedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>

  );
}
