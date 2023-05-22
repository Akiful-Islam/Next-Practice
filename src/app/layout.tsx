import "./globals.css";
import { Slabo_27px } from "next/font/google";
import "@/styles/buttons.css";
import "@/styles/inputs.css";
import "@/styles/select.css";
import "@/styles/tables.css";
import "@/styles/texts.css";
import "@/styles/typography.css";
import Link from "next/link";
import Provider from "@/components/darkmode/Provider";
import DarkModeToggler from "@/components/darkmode/DarkModeToggler";

const slabo27 = Slabo_27px({
  weight: "400",
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "Next Spring",
  description: "Generated by create next app, Perfected by spring initializr.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          slabo27.className +
          " min-h-screen flex flex-col bg-gradient dark:bg-gradient-dark"
        }
      >
        <Provider>
          <section className="root-header bg-bnw-blue-gray inline-flex">
            <Link className="flex-1 mx-12 px-8" href="/employees">
              <h2 className="text-white mx-4 p-2">Employee Database</h2>
            </Link>
            <DarkModeToggler className="mx-4 px-4" />
          </section>
          <section className="root-body min-h-max flex-1 flex flex-col justify-center items-center">
            {children}
          </section>
          <section className="root-footer bg-bnw-blue-gray/10 text-black">
            <p className="text-center ">2023 &copy; All Rights Reserved</p>
          </section>
        </Provider>
      </body>
    </html>
  );
}
