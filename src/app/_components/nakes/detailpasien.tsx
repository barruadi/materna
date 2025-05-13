import React from "react";
import { Card, Row, Col } from "antd";

type DetailPasienProps = {
  data: {
    kontak: string;
    alamat: string;
    tanggalLahir: string;
    golongandarah: string;
  };
};

export function DetailPasien({ data }: DetailPasienProps) {
  return (
    <Card 
    title="Detail Pasien"
    style={{
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <p className="text-gray-500 text-sm">Kontak</p>
          <p className="text-base font-semibold">{data.kontak}</p>
        </Col>
        <Col span={12}>
          <p className="text-gray-500 text-sm">Alamat</p>
          <p className="text-base font-semibold">{data.alamat}</p>
        </Col>
        <Col span={12}>
          <p className="text-gray-500 text-sm">Tanggal Lahir</p>
          <p className="text-base font-semibold">{data.tanggalLahir}</p>
        </Col>
        <Col span={12}>
          <p className="text-gray-500 text-sm">Golongan Darah</p>
          <p className="text-base font-semibold">{data.golongandarah}</p>
        </Col>
      </Row>
    </Card>
  );
}
