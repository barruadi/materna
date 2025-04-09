// src/app/_components/riwayat-form/RiwayatForm.tsx
'use client';

import React, { useState } from 'react';
import { Form, Button, Steps, message, Card, Spin } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, SendOutlined } from '@ant-design/icons';
import PemeriksaanForm from '../../_components/admin/riwayat-form/PemeriksaanForm';
import PelayananForm from '../../_components/admin/riwayat-form/PelayananForm';
import LaboratoriumForm from '../../_components/admin/riwayat-form/LaboratoriumForm';
import IntegrasiForm from '../../_components/admin/riwayat-form/IntegrasiForm';
import RujukanForm from '../../_components/admin/riwayat-form/RujukanForm';
import LainnyaForm from '~/app/_components/admin/riwayat-form/LainnyaForm';
import RiwayatBasicForm from '../../_components/admin/riwayat-form/RiwayatBasicForm';
import Topbar from '../../_components/admin/topbar';
import SidebarDesktop from '../../_components/admin/sidebar';
import { useRouter } from 'next/router';

const { Step } = Steps;
//const router = useRouter();

const RiwayatForm: React.FC = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const steps = [
    {
      title: 'Riwayat',
      content: <RiwayatBasicForm form={form} formData={formData} />,
    },
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
      
      // Prepare final form data, combining previous steps with current step
      const finalFormData = { ...formData, ...values };
      
      // Process date fields to ISO format for API submission
      const processedData = {
        ...finalFormData,
        createdAt: finalFormData.createdAt ? finalFormData.createdAt.toISOString() : undefined,
        tanggalMenstruasiTerakhir: finalFormData.tanggalMenstruasiTerakhir ? 
          finalFormData.tanggalMenstruasiTerakhir.toISOString() : undefined,
        tanggalPerkiraanLahir: finalFormData.tanggalPerkiraanLahir ? 
          finalFormData.tanggalPerkiraanLahir.toISOString() : undefined,
        tanggalKontrolKembali: finalFormData.tanggalKontrolKembali ? 
          finalFormData.tanggalKontrolKembali.toISOString() : undefined,
      };

      console.log('Final Form Data:', processedData);
      
      setSubmitting(true);
      
      // Submit data to API
      const response = await fetch('/api/riwayat/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      console.log('Response:', response);
      
      const result = await response.json();

      console.log('Result:', result);
      
      if (response.ok && result.success) {
        message.success('Data riwayat berhasil disimpan!');
        
        // Reset form and state
        form.resetFields();
        setFormData({});
        setCurrentStep(0);
        //router.push('/admin');
      } else {
        message.error(`Gagal menyimpan data: ${result.message || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Gagal menyimpan data. Silakan periksa kembali formulir Anda.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50">
        <Topbar username="Nakes"/>
        <div className="">
            <SidebarDesktop/>
        </div>
        <div className='ml-52 pt-16 min-h-screen bg-slate-50'>
        <Card className="riwayat-form-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Steps current={currentStep} style={{ marginBottom: 20 }}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          
          <Spin spinning={submitting} tip="Menyimpan data...">
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
                    disabled={submitting}
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
                    disabled={submitting}
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
                    loading={submitting}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          </Spin>
        </Card>
        </div>
    </div>
  );
};

export default RiwayatForm;

function setSubmitting(arg0: boolean) {
  throw new Error('Function not implemented.');
}
