import type { ReactNode } from "react"
import { auth } from "~/server/auth"

// desktop layout

export default function AdminLayout({
    children,
} : {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {/* place navbar */}
                <main> {children} </main>
            </body>
        </html>
    )
}