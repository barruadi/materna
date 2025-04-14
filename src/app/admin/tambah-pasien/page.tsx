'use client';

import { Suspense } from 'react';
import TambahPasien from './tambah-inner';

export default function TambahPasienWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TambahPasien />
    </Suspense>
  );
}