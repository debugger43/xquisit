import type { Metadata } from "next";
import "./globals.css";
import { radlush } from "./fonts";
import DynamicCursor from "@/app/components/ui/DynamicCursor";

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
        <DynamicCursor />
      </body>
    </html>
  );
}