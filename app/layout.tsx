import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "发票业财中台",
  description: "收入、成本、代垫、应收销账与链票集成的一体化原型系统"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
