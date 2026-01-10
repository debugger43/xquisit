import type { Metadata } from "next";
import "./globals.css";
import { radlush } from "./fonts";

export const metadata: Metadata = {
  title: "XQUISit",
  description: "Creative Agency Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <html lang="en" className={radlush.variable}>
     <body className="antialiased">
        {children}
      </body>
    </html>
  );
}