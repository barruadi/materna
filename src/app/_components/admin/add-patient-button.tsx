"use client"

import React from 'react';
import { Button, Popover, Space} from 'antd';
import Link from 'next/link';

const content = (
  <div>
    <Space direction='vertical'>
        <Button className='bg-[#FFD96C] border-0 hover:border-[.5px]' href='/admin/tambah-pasien?session=desktop'>Masukkan Manual</Button>
        <Button className='bg-[#FFD96C] border-0 hover:border-[.5px]' href='/admin/show-qr'>Gunakan QR Code</Button>
    </Space>
  </div>
);

const AddPatientButton: React.FC = () => (
    <Popover placement='bottomRight' content={content} title="Pilih Metode" trigger="click" className='ml-3'>
      <Button className='bg-[#FFD96C] border-0 hover:border-[.5px]'>Tambah Pasien</Button>
    </Popover>
);

export default AddPatientButton;