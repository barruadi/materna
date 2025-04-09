"use client";

import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";
import { api } from "~/trpc/react";

export default function PasienList() {
  const { data: pasien, isLoading } = api.pasien.getAllPasien.useQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4 border rounded-lg space-y-2">
      <h2 className="text-xl font-bold">Daftar Pasien</h2>
      {pasien?.length === 0 ? (
        <p>Tidak ada pasien</p>
      ) : (
        <ul className="space-y-2">
          {pasien?.map((p: { id: Key | null | undefined; nama: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; email: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; nik: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; tanggalLahir: string | number | Date; golonganDarah: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
            <li key={p.id} className="p-2 border rounded">
              <p><strong>Nama:</strong> {p.nama}</p>
              <p><strong>Email:</strong> {p.email}</p>
              <p><strong>NIK:</strong> {p.nik}</p>
              <p><strong>Tanggal Lahir:</strong> {new Date(p.tanggalLahir).toLocaleDateString()}</p>
              <p><strong>Golongan Darah:</strong> {p.golonganDarah}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
