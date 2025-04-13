'use client';

import { Form } from "antd";
import PemeriksaanForms from "~/app/_components/admin/riwayat-form/PemeriksaanForms";

const MyComponent = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical">
      <PemeriksaanForms form={form} formData={{}} />
    </Form>
  );
};

export default MyComponent;
