import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

// Poppins is the Potto house face, for headings and body alike. Geist Mono is
// the receipt: every price, quantity, reference and section label is set in it.
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PottoStore | The school store, online and cashless, by Potto",
  description:
    "PottoStore gives schools an online store and a cashless counter: admission forms, textbooks, uniforms and snacks, with live stock, parental spending controls and financial reconciliation in one record.",
  icons: {
    icon: [{ url: "/potto-mark.webp", type: "image/webp" }],
    shortcut: "/potto-mark.webp",
    apple: "/potto-mark.webp",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
