import React from 'react';
import { Card } from 'antd';
import ResikoDesktop from './resiko';

interface PasienCardProps {
  nama: string;
    idResikoPasien: number;
}

const NameCard: React.FC<PasienCardProps> = ({ nama, idResikoPasien }) => (
  <Card
    title= "Nama Pasien"
    size="small"
    style={{
      height: 125,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">{nama}</p>
        <ResikoDesktop idResikoPasien={idResikoPasien} />
    </div>

  </Card>
);

export default NameCard;
