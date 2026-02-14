import "./globals.css";
import { Inter, Poppins } from 'next/font/google';
import SmoothScroll from './SmoothScroll'

// Optimized font loading with Next.js
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: {
    default: "Diverse Loopers",
    template: "%s | Diverse Loopers",
  },
  description: "Hybrid Hustle – empowering talent for tomorrow",
  keywords: ["diverse loopers", "hybrid hustle", "talent platform"],
  authors: [{ name: "Diverse Loopers" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`scroll-smooth bg-[#0f172a] ${inter.variable} ${poppins.variable}`}
    >
      <head>
        {/* Preconnect for performance (optional, fonts already optimized) */}
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className="font-sans text-slate-800 bg-white min-h-screen overflow-x-hidden">
         <SmoothScroll />
        {children}
      </body>
    </html>
  );
}