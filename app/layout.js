import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fridge Se Rasoi",
  description: "AI-Powered Recipe Generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Fridge Se Rasoi</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="Fridge Se Rasoi - AI-Powered Recipe Generator" />
      <meta name="keywords" content="AI, Recipes, Cooking, Ingredients, Food, Gemini API, Next.js, Jaydip, Jaydip Changani, Changani" />
      <meta name="author" content="Jaydip Changani" />
      <meta property="og:title" content="Fridge Se Rasoi" />
      <meta property="og:description" content="AI-Powered Recipe Generator" />
      <meta property="og:image" content="/og-image.png" />
      <meta property="og:url" content="https://fridge-se-rasoi.vercel.app/" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Fridge Se Rasoi" />
      <meta name="twitter:description" content="AI-Powered Recipe Generator" />
      <meta name="twitter:image" content="/og-image.png" />
      <meta name="google-site-verification" content="https://fridge-se-rasoi.vercel.app/" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
          <Analytics />
      </body>
    </html>
  );
}
