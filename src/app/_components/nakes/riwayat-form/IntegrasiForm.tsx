// src/app/_components/riwayat-form/IntegrasiForm.tsx
import React from 'react';
import { Form, Select } from 'antd';

interface IntegrasiFormProps {
  form: any;
  formData: any;
}

const IntegrasiForm: React.FC<IntegrasiFormProps> = ({ form, formData }) => {
  const options = [
    { value: 'ya', label: 'Ya' },
    { value: 'tidak', label: 'Tidak' },
    { value: 'tidakDiperiksa', label: 'Tidak Diperiksa' },
  ];

  const hasilOptions = [
    { value: 'positif', label: 'Positif' },
    { value: 'negatif', label: 'Negatif' },
    { value: 'tidakDiperiksa', label: 'Tidak Diperiksa' },
  ];

  return (
    <>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Pencegahan Penularan HIV dari Ibu ke Anak</h1>
      
      <Form.Item 
        name={['integrasi', 'ibuHamilDenganHIV']} 
        label="Ibu Hamil dengan HIV"
      >
        <Select placeholder="Pilih status" options={options} />
      </Form.Item>
      
      <Form.Item 
        name={['integrasi', 'ibuHamilDitawarkanTes']} 
        label="Ibu Hamil Ditawarkan Tes HIV"
      >
        <Select placeholder="Pilih status" options={options} />
      </Form.Item>
      
      <Form.Item 
        name={['integrasi', 'ibuHamilDitesHIV']} 
        label="Ibu Hamil Dites HIV"
      >
        <Select placeholder="Pilih status" options={options} />
      </Form.Item>
      
      <Form.Item 
        name={['integrasi', 'hasilTesHIV']} 
        label="Hasil Tes HIV"
      >
        <Select placeholder="Pilih hasil" options={hasilOptions} />
      </Form.Item>
      
      <Form.Item 
        name={['integrasi', 'ibuHamilMendapatART']} 
        label="Ibu Hamil Mendapat ART"
      >
        <Select placeholder="Pilih status" options={options} />
      </Form.Item>
      
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Ibu Hamil Diperiksa Darah</h1>

      <Form.Item 
        name={['integrasi', 'rdtDarah']} 
        label="RDT Darah"
      >
        <Select placeholder="Pilih status" options={hasilOptions} />
      </Form.Item>

      
      
      <Form.Item 
        name={['integrasi', 'mikroskopisDarah']} 
        label="Mikroskopis Darah"
      >
        <Select placeholder="Pilih status" options={hasilOptions} />
      </Form.Item>

      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>TB Dalam Kehamilan</h1>
      
      <Form.Item 
        name={['integrasi', 'ibuHamilDiperiksaDahak']} 
        label="Ibu Hamil Diperiksa Dahak"
      >
        <Select placeholder="Pilih status" options={options} />
      </Form.Item>
      
      <Form.Item 
        name={['integrasi', 'ibuHamilHasil']} 
        label="Hasil Pemeriksaan Dahak"
      >
        <Select placeholder="Pilih hasil" options={hasilOptions} />
      </Form.Item>

      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Ibu Hamil HIV (+)</h1>
      
      <Form.Item 
        name={['integrasi', 'persalinanPervaginam']} 
        label="Persalinan Pervaginam"
      >
        <Select placeholder="Pilih status" options={options} />
      </Form.Item>
      
      <Form.Item 
        name={['integrasi', 'persalinanPerabdominam']} 
        label="Persalinan Perabdominam"
      >
        <Select placeholder="Pilih status" options={options} />
      </Form.Item>

      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Pencegahan Malaria dalam Kehamilan</h1>
      
      <Form.Item 
        name={['integrasi', 'ibuHamilDiperiksaKelambu']} 
        label="Ibu Hamil Diperiksa Kelambu"
      >
        <Select placeholder="Pilih status" options={options} />
      </Form.Item>
      
      <Form.Item 
        name={['integrasi', 'ibuHamilMendapatKinaACT']} 
        label="Ibu Hamil Mendapat Kina/ACT"
      >
        <Select placeholder="Pilih status" options={options} />
      </Form.Item>

      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Ibu Hamil Malaria (+)</h1>
      
      <Form.Item 
        name={['integrasi', 'rdtMalaria']} 
        label="RDT Malaria"
      >
        <Select placeholder="Pilih status" options={hasilOptions} />
      </Form.Item>
      
      <Form.Item 
        name={['integrasi', 'mikroskopisMalaria']} 
        label="Mikroskopis Malaria"
      >
        <Select placeholder="Pilih status" options={hasilOptions} />
      </Form.Item>

      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Kecacingan Dalam Kehamilan</h1>
      
      <Form.Item 
        name={['integrasi', 'ibuHamilDiperiksaAnkilostoma']} 
        label="Ibu Hamil Diperiksa Ankilostoma"
      >
        <Select placeholder="Pilih status" options={options} />
      </Form.Item>
      
      <Form.Item 
        name={['integrasi', 'ibuHamilHasilTesAnkilostoma']} 
        label="Hasil Tes Ankilostoma"
      >
        <Select placeholder="Pilih hasil" options={hasilOptions} />
      </Form.Item>

      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Pencegahan Hepatitis dalam Kehamilan</h1>
      
      <Form.Item 
        name={['integrasi', 'ibuHamilDiperiksaHepatitis']} 
        label="Ibu Hamil Diperiksa Hepatitis"
      >
        <Select placeholder="Pilih status" options={options} />
      </Form.Item>
      
      <Form.Item 
        name={['integrasi', 'ibuHamilHasilTesHepatitis']} 
        label="Hasil Tes Hepatitis"
      >
        <Select placeholder="Pilih hasil" options={hasilOptions} />
      </Form.Item>
    </>
  );
};

export default IntegrasiForm;