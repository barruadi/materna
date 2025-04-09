import React from 'react';
import { Form, Select, DatePicker, Input } from 'antd';

interface LainnyaFormProps {
  form: any;
  formData: any;
}

const LainnyaForm: React.FC<LainnyaFormProps> = ({ form, formData }) => {
  const statusImunisasiOptions = [
    { value: 't1', label: 'T1' },
    { value: 't2', label: 'T2' },
    { value: 't3', label: 'T3' },
    { value: 't4', label: 'T4' },
    { value: 't5', label: 'T5' },
  ];

  const yesNoOptions = [
    { value: 'ya', label: 'Ya' },
    { value: 'tidak', label: 'Tidak' },
  ];

  const risikoOptions = [
    { value: 'nakes', label: 'Tenaga Kesehatan' },
    { value: 'mandiri', label: 'Mandiri' },
    { value: 'keluarga', label: 'Keluarga' },
    { value: 'tidakTerdeteksi', label: 'Tidak Terdeteksi' },
  ];

  const komplikasiOptions = [
    { value: 'tidak', label: 'Tidak Ada' },
    { value: 'hipertensi', label: 'Hipertensi' },
    { value: 'preeklampsia', label: 'Preeklampsia' },
    { value: 'perdarahan', label: 'Perdarahan' },
    { value: 'lainnya', label: 'Lainnya' },
  ];

  return (
    <>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Lainnya</h1>

      <Form.Item
        name={['lainnya', 'statusImunisasi']}
        label="Status Imunisasi"
      >
        <Select placeholder="Pilih status imunisasi" options={statusImunisasiOptions} />
      </Form.Item>

      <Form.Item
        name={['lainnya', 'konseling']}
        label="Konseling"
      >
        <Select placeholder="Pilih ya atau tidak" options={yesNoOptions} />
      </Form.Item>

      <Form.Item
        name={['lainnya', 'risikoTerdeteksiOleh']}
        label="Risiko Terdeteksi Oleh"
      >
        <Select placeholder="Pilih deteksi risiko" options={risikoOptions} />
      </Form.Item>

      <Form.Item
        name={['lainnya', 'komplikasi']}
        label="Komplikasi"
      >
        <Select placeholder="Pilih komplikasi" options={komplikasiOptions} />
      </Form.Item>

      <Form.Item
        name={['lainnya', 'hpht']}
        label="Tanggal Menstruasi Terakhir (HPHT)"
      >
        <DatePicker style={{ width: '100%' }} placeholder="Pilih tanggal HPHT" />
      </Form.Item>

      <Form.Item
        name={['lainnya', 'perkiraanLahir']}
        label="Tanggal Perkiraan Lahir"
      >
        <DatePicker style={{ width: '100%' }} placeholder="Pilih tanggal perkiraan lahir" />
      </Form.Item>

      <Form.Item
        name={['lainnya', 'kontrolKembali']}
        label="Tanggal Kontrol Kembali"
      >
        <DatePicker style={{ width: '100%' }} placeholder="Pilih tanggal kontrol kembali" />
      </Form.Item>
    </>
  );
};

export default LainnyaForm;
