import type { Metadata } from "next";
import {  Geist_Mono,  Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "RE:ply",
  description:
    "Classifique os seus e-mails como produtivo ou improdutivo e gere uma resposta automática.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors />
        <BackgroundGradientAnimation
          gradientBackgroundStart="#0A1A2F"
          gradientBackgroundEnd="#142F4B"
          firstColor="77, 166, 255"     
          secondColor="30, 144, 255"    
          thirdColor="51, 153, 255"     
          fourthColor="15, 42, 80"      
          fifthColor="128, 207, 255"   
          pointerColor="30, 144, 255"   
          size="80%"
          blendingValue="hard-light"
        >
          {children}
        </BackgroundGradientAnimation>
      </body>
    </html>
  );
}
