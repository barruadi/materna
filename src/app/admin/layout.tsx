import type { ReactNode } from "react";
import PageHeader from "../_components/admin/header-desktop"
import Sidebar from "../_components/admin/sider-desktop"
import { Header } from "antd/es/layout/layout";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <PageHeader/>
            <div className="flex flex-row flex-grow">
                <Sidebar/>
                <div className="flex-grow overflow-auto">
                <Header className="px-7 bg-white flex flex-row justify-between items-center">
                    <b className="text-xl">Daftar Pasien</b>
                </Header>
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}
