import type { Metadata } from "next";
import { DM_Serif_Text, Fustat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import Loader from "@/components/site/Loader";

const dmSerif = DM_Serif_Text({
  variable: "--font-dm-serif",
  // Published in a single weight.
  weight: "400",
  style: "normal",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const fustat = Fustat({
  variable: "--font-fustat",
  subsets: ["arabic", "latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bilal Moubarak Cartography Studio",
  description:
    "An independent cartographic studio built on more than 34 years of professional experience. Atlases, educational and thematic maps, tourism mapping and GIS data, developed around the purpose of each project.",
  openGraph: {
    title: "Bilal Moubarak Cartography Studio",
    description:
      "We transform geography and information into knowledge through maps.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${dmSerif.variable} ${fustat.variable} is-loading h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
        {/* Covers the first paint until the page's pinned sections are built. */}
        <Loader />
        <noscript>
          <style>{`.site-loader{display:none!important}html.is-loading{overflow:auto!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
