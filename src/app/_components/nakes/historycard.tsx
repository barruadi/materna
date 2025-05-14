import React from 'react';
import { Card, Space, Button } from 'antd';

interface HistoryCardProps {
  date: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ date }) => (
    <Card
    title= "Pemeriksaan Terakhir"
    size="small"
    style={{
      height: 125,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span className="text-3xl font-bold">{date}</span>
      <Button type="primary">Detail Pemeriksaan Terakhir</Button>
    </div>
  </Card>
);

export default HistoryCard;
