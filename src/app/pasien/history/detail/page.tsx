"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from 'react';
import { 
    Collapse,
    CollapseProps,
    theme,
    Space,
    Flex,
    Button,
    Card,
} from "antd";
import { 
    LeftOutlined,
    CaretRightOutlined,
} from "@ant-design/icons";

// Riwayat content (same as before)
const riwayatContent = {
  pemeriksaan: "Berisi hasil pemeriksaan kehamilan seperti tekanan darah, detak jantung janin, dan lainnya.",
  pelayanan: "Catatan pelayanan medis yang telah diterima selama masa kehamilan.",
  laboratorium: "Rekaman hasil tes laboratorium seperti darah, urin, dan lainnya.",
  integrasi: "Data integrasi dari sistem lain seperti BPJS atau fasilitas kesehatan lain.",
  rujukan: "Informasi tentang rujukan ke spesialis atau rumah sakit lain.",
  lainnya: "Catatan tambahan yang tidak termasuk dalam kategori di atas.",
};

// Dummy summary steps
const summarySteps = [
  "Pemeriksaan terakhir menunjukkan tekanan darah normal dan detak jantung janin stabil.",
  "Pasien rutin menerima pelayanan konsultasi gizi dan pemeriksaan kandungan.",
  "Hasil laboratorium menunjukkan tidak ada kelainan pada darah dan urin.",
  "Data telah diintegrasikan dengan BPJS dan rekam medis dari rumah sakit rujukan.",
  "Pasien pernah dirujuk ke dokter spesialis kandungan untuk pemeriksaan lanjutan.",
  "Tidak ada catatan tambahan signifikan pada riwayat lainnya."
];

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
  { key: '1', label: 'Riwayat Pemeriksaan', children: <p>{riwayatContent.pemeriksaan}</p>, style: panelStyle },
  { key: '2', label: 'Riwayat Pelayanan', children: <p>{riwayatContent.pelayanan}</p>, style: panelStyle },
  { key: '3', label: 'Riwayat Laboratorium', children: <p>{riwayatContent.laboratorium}</p>, style: panelStyle },
  { key: '4', label: 'Riwayat Integrasi', children: <p>{riwayatContent.integrasi}</p>, style: panelStyle },
  { key: '5', label: 'Riwayat Rujukan', children: <p>{riwayatContent.rujukan}</p>, style: panelStyle },
  { key: '6', label: 'Riwayat Lainnya', children: <p>{riwayatContent.lainnya}</p>, style: panelStyle },
];

function DetailPage() {
  const router = useRouter();
  const { token } = theme.useToken();

  const panelStyle: CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineWords, setCurrentLineWords] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Begin summarization
  const handleSummarize = () => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentWordIndex(0);
    setCurrentText("");
    setCurrentLineWords(summarySteps[0]?.split(" ") || []);
    setIsSummarizing(true);
  };

  useEffect(() => {
    if (!isSummarizing) return;

    const line = summarySteps[currentLineIndex];
    if (!line) return;

    const words = line.split(" ");
    const timer = setTimeout(() => {
      if (currentWordIndex < words.length) {
        setCurrentText((prev) => prev + (prev ? " " : "") + words[currentWordIndex]);
        setCurrentWordIndex((prev) => prev + 1);
      } else {
        // Line is complete, move to next
        setDisplayedLines((prev) => [...prev, currentText]);
        setCurrentText("");
        setCurrentWordIndex(0);
        const nextIndex = currentLineIndex + 1;
        if (nextIndex < summarySteps.length) {
          setCurrentLineIndex(nextIndex);
          setCurrentLineWords(summarySteps[nextIndex].split(" "));
        } else {
          setIsSummarizing(false); // done
        }
      }
    }, 250); // word delay

    return () => clearTimeout(timer);
  }, [currentWordIndex, isSummarizing, currentLineIndex, currentText]);

  return (
    <div className="h-screen w-full p-4">
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

        <Card title="Ringkasan Riwayat" bordered={true}>
          <Button 
            type="primary" 
            onClick={handleSummarize} 
            disabled={isSummarizing}
          >
            {isSummarizing ? "Menyusun Ringkasan..." : "Tampilkan Ringkasan"}
          </Button>

          <div style={{ marginTop: '16px' }}>
            {displayedLines.map((line, index) => (
              <p key={index}>• {line}</p>
            ))}
            {currentText && (
              <p>• {currentText}</p>
            )}
          </div>
        </Card>
      </Space>
    </div>
  );
}

export default DetailPage;
