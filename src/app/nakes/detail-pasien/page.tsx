'use client';

import { DetailPasien } from "../../_components/nakes/detailpasien";
import HistoryCard from "../../_components/nakes/historycard";
import NameCard from "../../_components/nakes/namecard";
import SidebarDesktop from "../../_components/nakes/sidebar";
import { Suami } from "../../_components/nakes/suami";
import Topbar from "../../_components/nakes/topbar";
import { Col, Row } from 'antd';

export default function NakesPage() {
    return (
      <div className="p-8 space-y-6 bg-slate-50">
        <Topbar username="Nakes" />
        <div className="">
            <SidebarDesktop />
        </div>
        
        <div className="pl-52 p-8 space-y-6"> {/* padding-left = lebar sidebar */}
            <Row className="h-">
                <Col span={12}>
                    <NameCard nama="John Doe" idResikoPasien={0} />
                </Col>
                <Col className="pl-5" span={12}>
                    <HistoryCard date="12/12/2021" />
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={18}>
                    <DetailPasien
                    data={{
                        kontak: "tes",
                        alamat: "tes",
                        tanggalLahir: "tes",
                        golongandarah: "tes",
                    }}
                    />
                </Col>
                <Col span={6}>
                    <Suami
                    data={{
                        nama: "tes",
                        noTelepon: "tes",
                    }}
                    />
                </Col>
            </Row>


        </div>
      </div>
    );
  }