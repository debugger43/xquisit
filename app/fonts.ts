import localFont from "next/font/local";

export const radlush = localFont({
  src: [
    { path: "./fonts/radlush.regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/radlush.medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/radlush.bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/radlush.black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-radlush",
  display: "swap",
});