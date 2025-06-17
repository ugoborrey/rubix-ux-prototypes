import type { Metadata } from "next";
import "./globals.css";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import { rubixFont } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Rubix UX Prototypes",
  description: "Internal design showcase for UX prototypes and interface designs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={rubixFont.className}>
        <ConditionalHeader />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
