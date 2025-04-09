// src/app/_components/riwayat-form/PemeriksaanForm.tsx
import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';

interface PemeriksaanFormProps {
  form: any;
  formData: any;
}

const PemeriksaanForm: React.FC<PemeriksaanFormProps> = ({ form, formData }) => {
  return (
    <>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Ibu</h1>
      
      <Form.Item 
        name={['pemeriksaan', 'anamnesis']} 
        label="Anamnesis"
      >
        <Input.TextArea rows={4} placeholder="Masukkan anamnesis..." />
      </Form.Item>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <Form.Item 
          name={['pemeriksaan', 'beratBadan']} 
          label="Berat Badan (kg)"
          style={{ flex: 1 }}
        >
          <InputNumber style={{ width: '100%' }} min={0} precision={1} placeholder="Berat badan" />
        </Form.Item>
        
        <Form.Item 
          name={['pemeriksaan', 'tinggiBadan']} 
          label="Tinggi Badan (cm)"
          style={{ flex: 1 }}
        >
          <InputNumber style={{ width: '100%' }} min={0} precision={1} placeholder="Tinggi badan" />
        </Form.Item>
      </div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <Form.Item 
          name={['pemeriksaan', 'tekananDarahSistole']} 
          label="Tekanan Darah Sistole (mmHg)"
          style={{ flex: 1 }}
        >
          <InputNumber style={{ width: '100%' }} min={0} placeholder="Sistole" />
        </Form.Item>
        
        <Form.Item 
          name={['pemeriksaan', 'tekananDarahDiastole']} 
          label="Tekanan Darah Diastole (mmHg)"
          style={{ flex: 1 }}
        >
          <InputNumber style={{ width: '100%' }} min={0} placeholder="Diastole" />
        </Form.Item>
      </div>
      
      <Form.Item 
        name={['pemeriksaan', 'tinggiFundusUteri']} 
        label="Tinggi Fundus Uteri (cm)"
      >
        <InputNumber style={{ width: '100%' }} min={0} precision={1} placeholder="Tinggi fundus uteri" />
      </Form.Item>
      
      <Form.Item 
        name={['pemeriksaan', 'n']} 
        label="N"
      >
        <Input placeholder="Nilai N" />
      </Form.Item>
      
      <Form.Item 
        name={['pemeriksaan', 'lingkarLenganAtas']} 
        label="Lingkar Lengan Atas (cm)"
      >
        <InputNumber style={{ width: '100%' }} min={0} precision={1} placeholder="Lingkar lengan atas" />
      </Form.Item>
      
      <Form.Item 
        name={['pemeriksaan', 'statusGizi']} 
        label="Status Gizi"
      >
        <Select
          placeholder="Pilih status gizi"
          options={[
            { value: 'baik', label: 'Baik' },
            { value: 'kurang', label: 'Kurang' },
            { value: 'buruk', label: 'Buruk' },
          ]}
        />
      </Form.Item>
      
      <Form.Item 
        name={['pemeriksaan', 'refleksPatella']} 
        label="Refleks Patella"
      >
        <Select
          placeholder="Pilih refleks patella"
          options={[
            { value: 'positif', label: 'Positif' },
            { value: 'negatif', label: 'Negatif' },
          ]}
        />
      </Form.Item>
      
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Bayi</h1>

      <Form.Item 
        name={['pemeriksaan', 'denyutJantungJanin']} 
        label="Denyut Jantung Janin (per menit)"
      >
        <InputNumber style={{ width: '100%' }} min={0} placeholder="DJJ" />
      </Form.Item>
      
      <Form.Item 
        name={['pemeriksaan', 'kepalaTerhadapPAP']} 
        label="Kepala Terhadap PAP"
      >
        <InputNumber style={{ width: '100%' }} min={0} precision={1} placeholder="Kepala terhadap PAP" />
      </Form.Item>
      
      <Form.Item 
        name={['pemeriksaan', 'taksiranBeratJanin']} 
        label="Taksiran Berat Janin (gram)"
      >
        <InputNumber style={{ width: '100%' }} min={0} placeholder="TBJ" />
      </Form.Item>
      
      <Form.Item 
        name={['pemeriksaan', 'presentasi']} 
        label="Presentasi"
      >
        <Select
          placeholder="Pilih presentasi"
          options={[
            { value: 'kepala', label: 'Kepala' },
            { value: 'bokong', label: 'Bokong' },
            { value: 'lintang', label: 'Lintang' },
          ]}
        />
      </Form.Item>
    </>
  );
};

export default PemeriksaanForm;