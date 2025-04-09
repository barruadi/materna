// src/app/_components/riwayat-form/RiwayatForm.tsx
'use client';

import React, { useState } from 'react';
import { Form, Button, Steps, message, Card } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, SendOutlined } from '@ant-design/icons';
import PemeriksaanForm from '../../_components/nakes/riwayat-form/PemeriksaanForm';
import PelayananForm from '../../_components/nakes/riwayat-form/PelayananForm';
import LaboratoriumForm from '../../_components/nakes/riwayat-form/LaboratoriumForm';
import IntegrasiForm from '../../_components/nakes/riwayat-form/IntegrasiForm';
import RujukanForm from '../../_components/nakes/riwayat-form/RujukanForm';
import LainnyaForm from '~/app/_components/nakes/riwayat-form/LainnyaForm';
import RiwayatBasicForm from '../../_components/nakes/riwayat-form/RiwayatBasicForm';
import Topbar from '~/app/_components/nakes/topbar';
import SidebarDesktop from '~/app/_components/nakes/sidebar';

const { Step } = Steps;

const RiwayatForm: React.FC = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = [
    // {
    //   title: 'Riwayat',
    //   content: <RiwayatBasicForm form={form} formData={formData} />,
    // },
    {
      title: 'Pemeriksaan',
      content: <PemeriksaanForm form={form} formData={formData} />,
    },
    {
      title: 'Pelayanan',
      content: <PelayananForm form={form} formData={formData} />,
    },
    {
      title: 'Laboratorium',
      content: <LaboratoriumForm form={form} formData={formData} />,
    },
    {
      title: 'Integrasi',
      content: <IntegrasiForm form={form} formData={formData} />,
    },
    {
      title: 'Rujukan',
      content: <RujukanForm form={form} formData={formData} />,
    },
    {
      title: 'Lainnya',
      content: <LainnyaForm form={form} formData={formData} />,
    }
  ];

  const next = async () => {
    try {
      // Validate fields of current form
      const values = await form.validateFields();
      
      // Update form data
      const newFormData = { ...formData, ...values };
      setFormData(newFormData);
      
      setCurrentStep(currentStep + 1);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      // Validate all fields
      const values = await form.validateFields();
      const finalFormData = { ...formData, ...values };
      
      // Submit data
      console.log('Form data submitted:', finalFormData);
      
      // Here you would typically send the data to your API
      // await submitRiwayatData(finalFormData);
      
      message.success('Form submitted successfully!');
      form.resetFields();
      setFormData({});
      setCurrentStep(0);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      message.error('Please fill in all required fields.');
    }
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50">
        <Topbar username="Nakes" />
        <div className="">
            <SidebarDesktop />
        </div>
        <div className='ml-52 pt-16 min-h-screen bg-slate-50'>
        <Card className="riwayat-form-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Steps current={currentStep} style={{ marginBottom: 20 }}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          
          <Form
            form={form}
            layout="vertical"
            initialValues={formData}
          >
            <div className="steps-content">
              {steps[currentStep] ? steps[currentStep].content : null}
            </div>

            
            <div className="steps-action" style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
              {currentStep > 0 && (
                <Button 
                  icon={<ArrowLeftOutlined />} 
                  onClick={prev}
                >
                  Previous
                </Button>
              )}
              
              {currentStep < steps.length - 1 && (
                <Button 
                  type="primary" 
                  onClick={next}
                  style={{ marginLeft: 'auto' }}
                  icon={<ArrowRightOutlined />}
                >
                  Next
                </Button>
              )}
              
              {currentStep === steps.length - 1 && (
                <Button 
                  type="primary" 
                  onClick={handleSubmit}
                  style={{ marginLeft: 'auto' }}
                  icon={<SendOutlined />}
                >
                  Submit
                </Button>
              )}
            </div>
          </Form>
        </Card>
        </div>
    </div>
  );
};

export default RiwayatForm;