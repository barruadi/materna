"use client"

import type { CSSProperties } from 'react';
import { useRouter } from "next/navigation";

import { 
    Collapse,
    CollapseProps,
    theme,
    Space,
    Flex
} from "antd";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
      key: '1',
      label: 'Riwayat Pemeriksaan',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '2',
      label: 'Riwayat Pelayanan',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '3',
      label: 'Riwayat Laboratorium',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '4',
      label: 'Riwayat Integrasi',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '5',
      label: 'Riwayat Rujukan',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '6',
      label: 'Riwayat Lainnya',
      children: <p>{text}</p>,
      style: panelStyle,
    },
];
  

import { 
    LeftOutlined,
    CaretRightOutlined,
 } from "@ant-design/icons";

function HistoryDetailPage() {
    const router = useRouter();
    
    const { token } = theme.useToken();

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    return (
        <>
            <Space direction="vertical" style={{ display: 'flex', gap: '24px' }}>
                <Flex gap={"middle"}>
                    <LeftOutlined 
                        style={{ fontSize: '24px' }} 
                        onClick={() => router.push('/pasien/history')}
                    />
                    <h2 className="text-xl font-semibold">    
                        Detail History
                    </h2>
                </Flex>
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    style={{ background: token.colorBgContainer }}
                    items={getItems(panelStyle)}
                    />
            </Space>
        </>
    )
}

export default HistoryDetailPage;