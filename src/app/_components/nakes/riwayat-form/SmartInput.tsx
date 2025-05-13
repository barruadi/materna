import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';
import { AudioOutlined, EditOutlined } from '@ant-design/icons';
import { useSpeechToText } from '../../../utility/useSpeechToText';
import wordsToNumbers from 'words-to-numbers'; 

interface SmartInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  isNumber?: boolean;
}

const SmartInput: React.FC<SmartInputProps> = ({ value, onChange, placeholder, isNumber }) => {
  const [listening, setListening] = useState(false);
  const [editable, setEditable] = useState(true);

  const onResult = (text: string) => {
    let result = text;
  
    if (isNumber) {
      const converted = wordsToNumbers(text);
      if (typeof converted === 'number') {
        result = converted.toString(); // <-- Konversi number ke string
      }
    }
  
    onChange?.(result);
    setEditable(true);
    setListening(false);
  };  

  const { toggleListening } = useSpeechToText(onResult);

  const handleMic = () => {
    setEditable(false); // disable dulu, tunggu hasil mic
    toggleListening();
    setListening((prev) => !prev);
  };

  const handleManualEdit = () => {
    setEditable(true);
    setListening(false);
  };

  return (
    <Space.Compact style={{ width: '100%' }}>
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={!editable}
        placeholder={placeholder}
      />
      <Button
        icon={<AudioOutlined />}
        type={listening ? 'primary' : 'default'}
        onClick={handleMic}
      />
      
    </Space.Compact>
  );
};

export default SmartInput;
