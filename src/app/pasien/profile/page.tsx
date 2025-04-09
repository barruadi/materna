"use client";

import { 
    Input, 
    Space,
    Typography,
    Button,
    Avatar
} from 'antd';

import { 
    UserOutlined,
    EditOutlined,
    QrcodeOutlined
} from '@ant-design/icons';

import { useState } from 'react';

const { Text, Title } = Typography;

function ProfilePasien() {

    const [editable, setEditable] = useState<boolean>(false);

    const [nik, setNik] = useState<number>(0);

    return (
        <div className="flex flex-col justify-center m-6">
            <Avatar size={128} icon={<UserOutlined/>}/>
            <Title level={2}>
                Nama Pasien
            </Title>
            <Text>
                Anda Sudah Terdaftar BPJS    
            </Text> 

            <Space direction="vertical" style={{ display: 'flex', gap: '24px' }}>
                <Button type="primary" href='/pasien' icon={<QrcodeOutlined/>} block iconPosition='end'>
                    Pindai QR Code
                </Button>
                
                {/* Biodata Diri */}
                <Space direction="horizontal" style={{ display: 'flex' }}>
                    <Title level={4} style={{ margin: 0 }}>
                        Biodata Diri
                    </Title>
                    <EditOutlined />
                </Space>
                <Space direction="vertical" style={{ display: 'flex' }}>
                    <Text>NIK</Text>
                    <Input placeholder="NIK" defaultValue="test" disabled={editable}/>
                    <Text>Tanggal Lahir</Text>
                    <Input placeholder="1 Januari 2000" defaultValue="test"/>
                    <Text>Golongan Darah</Text>
                    <Input placeholder="O" defaultValue="test"/>
                    <Text>Kontak</Text>
                    <Input placeholder="08123456789" defaultValue="test"/>
                </Space>

                {/* Keterangan Suami */}
                <Space direction="horizontal" style={{ display: 'flex' }}>
                    <Title level={4} style={{ margin: 0 }}>
                        Keterangan Suami
                    </Title>
                    <EditOutlined />
                </Space>
                <Space direction="vertical" style={{ display: 'flex' }}>
                    <Text>NIK</Text>
                    <Input placeholder="NIK" defaultValue="test" disabled={editable}/>
                    <Text>Tanggal Lahir</Text>
                    <Input placeholder="1 Januari 2000" defaultValue="test"/>
                </Space>
            </Space>
        </div>
    )
}

export default ProfilePasien;