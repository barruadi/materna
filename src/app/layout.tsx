import "~/styles/globals.css";

import React from 'react';

// Providers
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "~/trpc/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <TRPCReactProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  )
}