import type { Metadata } from "next";
//import "./globals.css";
import { STYLES } from "./styles/tanit-styles";
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";

export const metadata: Metadata = {
  title: "Tanit Terron",
  description: "Psicologa e accompagnatrice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{STYLES}</style>
      </head>
      <body className="tanit-root">
        <Navbar/>
        <Cursor/>
        {children}
      </body>
    </html>
  );
}
