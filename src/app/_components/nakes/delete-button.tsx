import React from 'react';
import type { PopconfirmProps } from 'antd';
import { Button, message, Popconfirm } from 'antd';

const confirm: PopconfirmProps['onConfirm'] = (e) => {
  console.log(e);
  message.success('Click on Yes');
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);
  message.error('Click on No');
};

const DeleteButton: React.FC = () => (
  <Popconfirm
    title="Hapus pasien"
    description="Anda yakin akan menghapus pasien?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Ya"
    cancelText="Tidak"
  >
    <a className='text-red-500 border-0 px-0'>Hapus</a>
  </Popconfirm>
);

export default DeleteButton;