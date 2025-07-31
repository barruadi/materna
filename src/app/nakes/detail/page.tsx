"use client"

import { GoogleGenAI } from "@google/genai";
import SidebarDesktop from '../../_components/nakes/sidebar';
import { useState } from "react";
import Topbar from '../../_components/nakes/topbar';
import { Form, Modal, Button, Input, InputNumber, Select, Spin } from "antd";

// Simulated AI call — replace with your real API
async function generateAIContent() {
    try {
    const ai = new GoogleGenAI({ apiKey: "AIzaSyBkoW3alJYkEa1V38DgV11CjmLltVstDJI" });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents:
          "Buat kesimpulan untuk pemeriksaan ibu hamil dengan resiko rendah, kadar hemoglobin 10, tinggi badan 160, berat badan 60, dan tekanan darah 70/120",
      });
  
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay
      return response.text;
    } catch (error) {
      console.error("Error generating content:", error);
      return "Terjadi kesalahan saat menghasilkan konten.";
    }
}

function detailPage () {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [aiText, setAiText] = useState("");
  
    const handleGenerateClick = async () => {
      setOpen(true);
      setLoading(true);
      setAiText("");
  
      const result = await generateAIContent();
      setAiText(result ?? "");
      setLoading(false);
    };
  
    const handleClose = () => {
      setOpen(false);
      setAiText("");
    };
    const [form] = Form.useForm();
    return (
    <div className="flex flex-col p-8 space-y-6 bg-slate-50">
      <Topbar username="Nakes" />
      <div>
        <SidebarDesktop />
      </div>
      <div className="ml-52 pt-4 min-h-screen bg-slate-50 items-center">
        <div className="flex flex-col gap-4 items-center">
            <div className="font-bold text-xl">
                Ringkas hasil dengan AI
            </div>
            <Button type="primary" onClick={handleGenerateClick} className="mb-12">
            Ringkas hasil dengan AI
            </Button>
        </div>
      <Modal
        title="AI Kesimpulan"
        open={open}
        onCancel={handleClose}
        footer={null}
        width="70%"
      >
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Spin size="large" />
          </div>
        ) : (
          <p className="text-gray-800 whitespace-pre-line">{aiText}</p>
        )}
      </Modal>
      <Form
      form={form}
      layout="vertical"
      initialValues={{
        pemeriksaan: {
          anamnesis: "Ibu mengeluh mual di pagi hari.",
          beratBadan: 62,
          tinggiBadan: 160,
          tekananDarahSistole: 110,
          tekananDarahDiastole: 70,
          tinggiFundusUteri: 30,
          n: 85,
          lingkarLenganAtas: 24,
          statusGizi: "baik",
          refleksPatella: "positif",
          denyutJantungJanin: 145,
          kepalaTerhadapPAP: 0,
          taksiranBeratJanin: 2900,
          presentasi: "kepala",
        },
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Ibu</h1>

      <Form.Item name={["pemeriksaan", "anamnesis"]} label="Anamnesis">
        <Input.TextArea rows={4} placeholder="Masukkan anamnesis..." />
      </Form.Item>

      <div style={{ display: "flex", gap: "20px" }}>
        <Form.Item
          name={["pemeriksaan", "beratBadan"]}
          label="Berat Badan (kg)"
          style={{ flex: 1 }}
        >
          <InputNumber
            min={0}
            precision={1}
            style={{ width: "100%" }}
            placeholder="Berat badan"
          />
        </Form.Item>

        <Form.Item
          name={["pemeriksaan", "tinggiBadan"]}
          label="Tinggi Badan (cm)"
          style={{ flex: 1 }}
        >
          <InputNumber
            min={0}
            precision={1}
            style={{ width: "100%" }}
            placeholder="Tinggi badan"
          />
        </Form.Item>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <Form.Item
          name={["pemeriksaan", "tekananDarahSistole"]}
          label="Tekanan Darah Sistole (mmHg)"
          style={{ flex: 1 }}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Sistole"
          />
        </Form.Item>

        <Form.Item
          name={["pemeriksaan", "tekananDarahDiastole"]}
          label="Tekanan Darah Diastole (mmHg)"
          style={{ flex: 1 }}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Diastole"
          />
        </Form.Item>
      </div>

      <Form.Item
        name={["pemeriksaan", "tinggiFundusUteri"]}
        label="Tinggi Fundus Uteri (cm)"
      >
        <InputNumber
          min={0}
          precision={1}
          style={{ width: "100%" }}
          placeholder="Tinggi fundus uteri"
        />
      </Form.Item>

      <Form.Item name={["pemeriksaan", "n"]} label="N">
        <InputNumber
          min={0}
          style={{ width: "100%" }}
          placeholder="Nilai N"
        />
      </Form.Item>

      <Form.Item
        name={["pemeriksaan", "lingkarLenganAtas"]}
        label="Lingkar Lengan Atas (cm)"
      >
        <InputNumber
          min={0}
          precision={1}
          style={{ width: "100%" }}
          placeholder="Lingkar lengan atas"
        />
      </Form.Item>

      <Form.Item name={["pemeriksaan", "statusGizi"]} label="Status Gizi">
        <Select
          placeholder="Pilih status gizi"
          options={[
            { value: "baik", label: "Baik" },
            { value: "kurang", label: "Kurang" },
            { value: "buruk", label: "Buruk" },
          ]}
        />
      </Form.Item>

      <Form.Item name={["pemeriksaan", "refleksPatella"]} label="Refleks Patella">
        <Select
          placeholder="Pilih refleks patella"
          options={[
            { value: "positif", label: "Positif" },
            { value: "negatif", label: "Negatif" },
          ]}
        />
      </Form.Item>

      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Bayi</h1>

      <Form.Item
        name={["pemeriksaan", "denyutJantungJanin"]}
        label="Denyut Jantung Janin (per menit)"
      >
        <InputNumber
          min={0}
          style={{ width: "100%" }}
          placeholder="DJJ"
        />
      </Form.Item>

      <Form.Item
        name={["pemeriksaan", "kepalaTerhadapPAP"]}
        label="Kepala Terhadap PAP"
      >
        <InputNumber
          min={0}
          precision={1}
          style={{ width: "100%" }}
          placeholder="Kepala terhadap PAP"
        />
      </Form.Item>

      <Form.Item
        name={["pemeriksaan", "taksiranBeratJanin"]}
        label="Taksiran Berat Janin (gram)"
      >
        <InputNumber
          min={0}
          style={{ width: "100%" }}
          placeholder="TBJ"
        />
      </Form.Item>

      <Form.Item name={["pemeriksaan", "presentasi"]} label="Presentasi">
        <Select
          placeholder="Pilih presentasi"
          options={[
            { value: "kepala", label: "Kepala" },
            { value: "bokong", label: "Bokong" },
            { value: "lintang", label: "Lintang" },
          ]}
        />
      </Form.Item>
    </Form>
      </div>
    </div>
    )
}

export default detailPage;