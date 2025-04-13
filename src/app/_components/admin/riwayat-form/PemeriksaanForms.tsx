import React, { useCallback, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useSpeechToText } from '../../../utility/useSpeechToText';
import SpeechInput from './SpeechInput';
import SmartInput from './SmartInput';

interface PemeriksaanFormProps {
  form: any;
  formData: any;
}

const PemeriksaanForms: React.FC<PemeriksaanFormProps> = ({ form, formData }) => {
  const [activeField, setActiveField] = useState<string | null>(null);
  const [placeholder, setPlaceholder] = useState<string>("Masukkan anamnesis..."); // Initial placeholder

  const onResult = useCallback((text: string) => {
    if (!activeField) return;

    const isNumberField = ['beratBadan', 'tinggiBadan', 'tekananDarahSistole', 'tekananDarahDiastole', 'tinggiFundusUteri', 'n', 'lingkarLenganAtas', 'denyutJantungJanin', 'kepalaTerhadapPAP', 'taksiranBeratJanin'].includes(activeField);
    const value = isNumberField ? parseFloat(text.replace(/[^\d.]/g, '')) : text;

    form.setFieldValue(['pemeriksaan', activeField], value);

    // Update placeholder with transcribed text
    setPlaceholder(text); // Set the placeholder dynamically
  }, [activeField, form]);

  const { toggleListening, listening } = useSpeechToText(onResult);

  const renderMic = (fieldName: string) => (
    <Button
      icon={<AudioOutlined />}
      type={listening && activeField === fieldName ? 'primary' : 'default'}
      onClick={() => {
        setActiveField(fieldName);
        toggleListening();
      }}
      style={{
        color: listening && activeField === fieldName ? 'blue' : 'inherit', // Change icon color to blue when active
      }}
    />
  );
  return (
    <>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Ibu</h1>

      <Form.Item name={['pemeriksaan', 'anamnesis']} label="Anamnesis">
        <SmartInput
          value={form.getFieldValue(['pemeriksaan', 'anamnesis'])}
          onChange={(val) => form.setFieldValue(['pemeriksaan', 'anamnesis'], val)}
          placeholder="Masukkan anamnesis..."
        />
      </Form.Item>




      {/* Add more form items like the one above if needed */}
    </>
  );
};

export default PemeriksaanForms;
