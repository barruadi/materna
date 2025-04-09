import React from 'react';
import { Form, Input, Select } from 'antd';

interface RujukanFormProps {
  form: any;
  formData: any;
}

const RujukanForm: React.FC<RujukanFormProps> = ({ form, formData }) => {
  const rujukanOptions = [
    { value: 'ya', label: 'Ya' },
    { value: 'tidak', label: 'Tidak' },
  ];
  
  const keadaanOptions = [
    { value: 'baik', label: 'Baik' },
    { value: 'sedang', label: 'Sedang' },
    { value: 'buruk', label: 'Buruk' },
    { value: 'kritis', label: 'Kritis' },
  ];

  return (
    <>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Ilitas Kesehatan</h1>
      
      <Form.Item 
        name={['rujukan', 'puskesmas']} 
        label="Puskesmas"
      >
        <Select placeholder="Rujuk ke Puskesmas" options={rujukanOptions} />
      </Form.Item>
      
      <Form.Item 
        name={['rujukan', 'rumahBersalin']} 
        label="Rumah Bersalin"
      >
        <Select placeholder="Rujuk ke Rumah Bersalin" options={rujukanOptions} />
      </Form.Item>
      
      <Form.Item 
        name={['rujukan', 'rsiaRsb']} 
        label="RSIA/RSB"
      >
        <Select placeholder="Rujuk ke RSIA/RSB" options={rujukanOptions} />
      </Form.Item>
      
      <Form.Item 
        name={['rujukan', 'rumahSakit']} 
        label="Rumah Sakit"
      >
        <Select placeholder="Rujuk ke Rumah Sakit" options={rujukanOptions} />
      </Form.Item>
      
      <Form.Item 
        name={['rujukan', 'lainLain']} 
        label="Lain-lain"
      >
        <Input placeholder="Spesifikasi rujukan lainnya" />
      </Form.Item>
      
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Keadaan</h1>

      <Form.Item 
        name={['rujukan', 'keadaanTiba']} 
        label="Keadaan Tiba"
      >
        <Select placeholder="Pilih keadaan tiba" options={keadaanOptions} />
      </Form.Item>
      
      <Form.Item 
        name={['rujukan', 'keadaanPulang']} 
        label="Keadaan Pulang"
      >
        <Select placeholder="Pilih keadaan pulang" options={keadaanOptions} />
      </Form.Item>
    </>
  );
};

export default RujukanForm;