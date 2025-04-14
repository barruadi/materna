"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function PasienForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    nama: "",
    nik: "",
    tanggalLahir: "",
    fotoProfil: "",
    kontak: "",
    golonganDarah: "",
  });

  const utils = api.useUtils();
  const createPasien = api.pasien.createPasien.useMutation({
    onSuccess: () => {
      alert("Pasien berhasil ditambahkan!");
      utils.pasien.getAllPasien.invalidate(); // Refresh data
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPasien.mutate({
      ...form,
      nik: Number(form.nik), 
      kontak: Number(form.kontak), 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Tambah Pasien</h2>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="p-2 border rounded w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="p-2 border rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Nama"
        value={form.nama}
        onChange={(e) => setForm({ ...form, nama: e.target.value })}
        className="p-2 border rounded w-full"
        required
      />
      <input
        type="number"
        placeholder="NIK"
        value={form.nik}
        onChange={(e) => setForm({ ...form, nik: e.target.value })}
        className="p-2 border rounded w-full"
        required
      />
      <input
        type="date"
        value={form.tanggalLahir}
        onChange={(e) => setForm({ ...form, tanggalLahir: e.target.value })}
        className="p-2 border rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Foto Profil (URL)"
        value={form.fotoProfil}
        onChange={(e) => setForm({ ...form, fotoProfil: e.target.value })}
        className="p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="Golongan Darah"
        value={form.golonganDarah}
        onChange={(e) => setForm({ ...form, golonganDarah: e.target.value })}
        className="p-2 border rounded w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Tambah Pasien
      </button>
    </form>
  );
}
