import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400","500","600","700","800"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  title: "Tatkal Claims | India's Most Trusted Insurance Dispute Resolution Platform",
  description: "Resolve your insurance claim disputes with expert legal professionals. 500+ cases assisted, ₹20+ Crores claims recovered. Claim rejection, delay, mis-selling & more.",
  keywords: ["insurance claim rejection","insurance dispute resolution","claim delay help","insurance ombudsman","mis-sold insurance","claim recovery","insurance grievance","health insurance dispute","motor insurance claim"],
  authors: [{ name: "Tatkal Claims" }],
  openGraph: { title: "Tatkal Claims | Resolve Insurance Claim Disputes", description: "Expert help for rejected, delayed, or disputed insurance claims. 500+ cases resolved.", siteName: "Tatkal Claims", locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image", title: "Tatkal Claims | Insurance Dispute Experts", description: "Recover your rightful insurance claims with professional dispute resolution." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: "https://claimresolve.pro" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, themeColor: "#1E3A8A" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX');` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "Tatkal Claims", url: "https://claimresolve.pro", logo: "https://claimresolve.pro/logo.png", description: "India's most trusted platform for resolving insurance complaints and disputes.", contactPoint: { "@type": "ContactPoint", telephone: "+91-9321152524", contactType: "customer service", areaServed: "IN", availableLanguage: ["English", "Hindi"] }, sameAs: ["https://facebook.com/claimresolvepro","https://twitter.com/claimresolvepro","https://linkedin.com/company/claimresolvepro"] }) }} />
      </head>
      <body className="font-body text-slate-800 antialiased bg-white">{children}</body>
    </html>
  );
}
