"use client"

import React from 'react';
import { Button, Popover, Space} from 'antd';
import Link from 'next/link';

const content = (
  <div>
    <Space direction='vertical'>
        <Link href="/admin/tambah-pasien">
          <Button className='bg-[#FFD96C] border-0 hover:border-[.5px]'>Masukkan Manual</Button>
        </Link>
        
        <Button className='bg-[#FFD96C] border-0 hover:border-[.5px]'>Gunakan QR Code</Button>
    </Space>
  </div>
);

const AddPatientButton: React.FC = () => (
    <Popover placement='bottomRight' content={content} title="Pilih Metode" trigger="click" className='ml-3'>
      <Button className='bg-[#FFD96C] border-0 hover:border-[.5px]'>Tambah Pasien</Button>
    </Popover>
);

export default AddPatientButton;