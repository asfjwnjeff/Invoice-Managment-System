import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "发票业财中台",
  description: "发票中心、客户结算、供应商结算、代垫款、应收与回款、税务合规与链票集成的一体化原型系统"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
