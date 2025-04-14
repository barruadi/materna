import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useSpeechToText } from '../../../utility/useSpeechToText';
import SmartInput from './SmartInput';

interface PemeriksaanFormProps {
  form: any;
  formData: any;
}

const PemeriksaanForm: React.FC<PemeriksaanFormProps> = ({ form, formData }) => {
  const [activeField, setActiveField] = useState<string | null>(null);

  const onResult = (text: string) => {
    if (!activeField) return;

    const isNumberField = ['beratBadan', 'tinggiBadan', 'tekananDarahSistole', 'tekananDarahDiastole', 'tinggiFundusUteri', 'n', 'lingkarLenganAtas', 'denyutJantungJanin', 'kepalaTerhadapPAP', 'taksiranBeratJanin'].includes(activeField);
    const value = isNumberField ? parseFloat(text.replace(/[^\d.]/g, '')) : text;

    form.setFieldValue(['pemeriksaan', activeField], value);
  };

  const { toggleListening, listening } = useSpeechToText(onResult);

  const renderMic = (fieldName: string) => (
    <Button
      icon={<AudioOutlined />}
      type={listening && activeField === fieldName ? 'primary' : 'default'}
      onClick={() => {
        setActiveField(fieldName);
        toggleListening();
      }}
      shape="circle"
    />
  );

  return (
    <>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Ibu</h1>
      
      <Form.Item 
        name={['pemeriksaan', 'anamnesis']} 
        label="Anamnesis"
      >
        <SmartInput
          value={form.getFieldValue(['pemeriksaan', 'anamnesis'])}
          onChange={(val) => form.setFieldValue(['pemeriksaan', 'anamnesis'], val)}
          placeholder="Masukkan anamnesis..."
          isNumber={false} 
        />
        {/* <Input.TextArea rows={4} placeholder="Masukkan anamnesis..." /> */}
      </Form.Item>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <Form.Item 
          name={['pemeriksaan', 'beratBadan']} 
          label="Berat Badan (kg)"
          style={{ flex: 1 }}
        >
          <SmartInput
          value={form.getFieldValue(['pemeriksaan', 'beratBadan'])}
          onChange={(val) => form.setFieldValue(['pemeriksaan', 'beratBadan'], val)}
          placeholder="Berat badan"
          isNumber={true} 
        />
          {/* <InputNumber style={{ width: '100%' }} min={0} precision={1} placeholder="Berat badan" /> */}
        </Form.Item>
        
        <Form.Item 
          name={['pemeriksaan', 'tinggiBadan']} 
          label="Tinggi Badan (cm)"
          style={{ flex: 1 }}
        >
          <SmartInput
          value={form.getFieldValue(['pemeriksaan', 'tinggiBadan'])}
          onChange={(val) => form.setFieldValue(['pemeriksaan', 'tinggiBadan'], val)}
          placeholder="Tinggi badan"
          isNumber={true} 
        />
          {/* <InputNumber style={{ width: '100%' }} min={0} precision={1} placeholder="Tinggi badan" /> */}
        </Form.Item>
      </div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <Form.Item 
          name={['pemeriksaan', 'tekananDarahSistole']} 
          label="Tekanan Darah Sistole (mmHg)"
          style={{ flex: 1 }}
        >
          <SmartInput
          value={form.getFieldValue(['pemeriksaan', 'tekananDarahSistole'])}
          onChange={(val) => form.setFieldValue(['pemeriksaan', 'tekananDarahSistole'], val)}
          placeholder="Sistole"
          isNumber={true} 
        />
          {/* <InputNumber style={{ width: '100%' }} min={0} placeholder="Sistole" /> */}
        </Form.Item>
        
        <Form.Item 
          name={['pemeriksaan', 'tekananDarahDiastole']} 
          label="Tekanan Darah Diastole (mmHg)"
          style={{ flex: 1 }}
        >
          <SmartInput
          value={form.getFieldValue(['pemeriksaan', 'tekananDarahDiastole'])}
          onChange={(val) => form.setFieldValue(['pemeriksaan', 'tekananDarahDiastole'], val)}
          placeholder="Diastole"
          isNumber={true} 
        />
          {/* <InputNumber style={{ width: '100%' }} min={0} placeholder="Diastole" /> */}
        </Form.Item>
      </div>
      
      <Form.Item 
        name={['pemeriksaan', 'tinggiFundusUteri']} 
        label="Tinggi Fundus Uteri (cm)"
      >
        <SmartInput
          value={form.getFieldValue(['pemeriksaan', 'tinggiFundusUteri'])}
          onChange={(val) => form.setFieldValue(['pemeriksaan', 'tinggiFundusUteri'], val)}
          placeholder="Tinggi fundus uteri"
          isNumber={true} 
        />
        {/* <InputNumber style={{ width: '100%' }} min={0} precision={1} placeholder="Tinggi fundus uteri" /> */}
      </Form.Item>
      
      <Form.Item 
        name={['pemeriksaan', 'n']} 
        label="N"
      >
        <SmartInput
          value={form.getFieldValue(['pemeriksaan', 'n'])}
          onChange={(val) => form.setFieldValue(['pemeriksaan', 'n'], val)}
          placeholder="Nilai N"
          isNumber={true} 
        />
        {/* <Input placeholder="Nilai N" /> */}
      </Form.Item>
      
      <Form.Item 
        name={['pemeriksaan', 'lingkarLenganAtas']} 
        label="Lingkar Lengan Atas (cm)"
      >
        <SmartInput
          value={form.getFieldValue(['pemeriksaan', 'lingkarLenganAtas'])}
          onChange={(val) => form.setFieldValue(['pemeriksaan', 'lingkarLenganAtas'], val)}
          placeholder="Lingkar lengan atas"
          isNumber={true} 
        />
        {/* <InputNumber style={{ width: '100%' }} min={0} precision={1} placeholder="Lingkar lengan atas" /> */}
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
        <SmartInput
          value={form.getFieldValue(['pemeriksaan', 'denyutJantungJanin'])}
          onChange={(val) => form.setFieldValue(['pemeriksaan', 'denyutJantungJanin'], val)}
          placeholder="DJJ"
          isNumber={true} 
        />
        {/* <InputNumber style={{ width: '100%' }} min={0} placeholder="DJJ" /> */}
      </Form.Item>
      
      <Form.Item 
        name={['pemeriksaan', 'kepalaTerhadapPAP']} 
        label="Kepala Terhadap PAP"
      >
         <SmartInput
          value={form.getFieldValue(['pemeriksaan', 'kepalaTerhadapPAP'])}
          onChange={(val) => form.setFieldValue(['pemeriksaan', 'kepalaTerhadapPAP'], val)}
          placeholder="Kepala terhadap PAP"
          isNumber={true} 
        />
        {/* <InputNumber style={{ width: '100%' }} min={0} precision={1} placeholder="Kepala terhadap PAP" /> */}
      </Form.Item>
      
      <Form.Item 
        name={['pemeriksaan', 'taksiranBeratJanin']} 
        label="Taksiran Berat Janin (gram)"
      >
         <SmartInput
          value={form.getFieldValue(['pemeriksaan', 'taksiranBeratJanin'])}
          onChange={(val) => form.setFieldValue(['pemeriksaan', 'taksiranBeratJanin'], val)}
          placeholder="TBJ"
          isNumber={true} 
        />
        {/* <InputNumber style={{ width: '100%' }} min={0} placeholder="TBJ" /> */}
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