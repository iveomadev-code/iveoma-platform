import { Raleway, Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-heading-monumental",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://iveomadevelopmentnetwork.org'),
  title: {
    default: "Iveoma Development Network | Institutional Impact",
    template: "%s | Iveoma Development Network"
  },
  description: "Iveoma Development Network (IDN) engineers sustainable development through technical rigor and community trust. Specializing in health systems, education, and economic empowerment.",
  keywords: ["Iveoma", "Development Network", "Ebonyi State", "Nigeria Development", "Social Impact", "Institutional Integrity", "Dr. Nkata Chuku"],
  authors: [{ name: "Iveoma Development Network" }],
  creator: "Iveoma Development Network",
  publisher: "Iveoma Development Network",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://iveomadevelopmentnetwork.org',
    siteName: 'Iveoma Development Network',
    title: 'Iveoma Development Network | Institutional Impact',
    description: 'Engineering sustainable development through technical rigor and community trust.',
    images: [
      {
        url: '/og-image.jpg', // Ensure this exists or I should create/mention it
        width: 1200,
        height: 630,
        alt: 'Iveoma Development Network - Institutional Impact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iveoma Development Network',
    description: 'Engineering sustainable development through technical rigor and community trust.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${raleway.variable}`} suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#0A2237] focus:text-white focus:px-4 focus:py-2 focus:rounded">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
