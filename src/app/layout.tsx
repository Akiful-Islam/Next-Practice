import "./globals.css";
import { Inter } from "next/font/google";
import "@/styles/buttons.css";
import "@/styles/inputs.css";
import "@/styles/select.css";
import "@/styles/tables.css";
import "@/styles/response.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spring Next Crud Practice",
  description: "Generated by create next app, Perfected by spring initializer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
