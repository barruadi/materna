import type { ReactNode } from "react";

export default function AdminLayout({ 
    children 
}: { 
    children: ReactNode 
}) {
    
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-row flex-grow">
                <div className="flex-grow overflow-auto">
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}