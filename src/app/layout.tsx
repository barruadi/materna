import "~/styles/globals.css";

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import { TRPCReactProvider } from "~/trpc/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </TRPCReactProvider>
      </body>
    </html>
  )
}