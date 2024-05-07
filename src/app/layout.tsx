import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Menu } from "@/components/app/menu";
import { Header } from "@/components/app/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} h-screen flex flex-col`}>
        <Header />

        <div className="flex-1 flex overflow-hidden ">
          <Menu />

          <main className="flex-1 overflow-hidden bg-zinc-50 flex">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
