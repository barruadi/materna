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

import { api } from '~/trpc/react';

import { useState } from 'react';

const { Text, Title } = Typography;

import { useSession } from 'next-auth/react';

function ProfilePasien() {
    const { data: session } = useSession();
    const [editable, setEditable] = useState<boolean>(false);
    const name = session?.user.name;

    const {data: data, isLoading} =  api.pasien.getPasienDetail.useQuery({
        pasienId: session?.user?.id || "",
    })

    return (
        <div className="flex flex-col justify-center m-6 w-full item">
            <Avatar size={128} icon={<UserOutlined/>}/>
            <Title level={2} style={{ margin: 0, textAlign: 'center', marginTop: '16px', marginBottom: '16px' }}>
                {name}
            </Title>

            <Space direction="vertical" style={{ display: 'flex', gap: '24px' }}>
                <Space direction="vertical" style={{ display: 'flex', gap: '4px' }}>
                    <Button type="primary" href='/pasien/scanqr' icon={<QrcodeOutlined/>} block iconPosition='end'>
                        Pindai QR Code
                    </Button>
                    <div className="text-center text-xs text-gray-500">
                        Anda sudah terdaftar BPJS
                    </div>
                </Space>
                
                {/* Biodata Diri */}
                <Space direction="horizontal" style={{ display: 'flex' }}>
                    <Title level={4} style={{ margin: 0 }}>
                        Biodata Diri
                    </Title>
                    <EditOutlined />
                </Space>
                <Space direction="vertical" style={{ display: 'flex' }}>
                    <Text>NIK</Text>
                    <Input placeholder="NIK" defaultValue={Number(data?.nik)} disabled={editable}/>
                    <Text>Tanggal Lahir</Text>
                    <Input placeholder="1 Januari 2000" defaultValue={String(data?.tanggalLahir)}/>
                    <Text>Golongan Darah</Text>
                    <Input placeholder="O" defaultValue={data?.golonganDarah}/>
                    <Text>Kontak</Text>
                    <Input placeholder="08123456789" defaultValue={Number(data?.kontak)}/>
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