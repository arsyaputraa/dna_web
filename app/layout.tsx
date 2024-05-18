import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter/Inter-thin.ttf",
      weight: "100",
    },
    {
      path: "../public/fonts/Inter/Inter-ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../public/fonts/Inter/Inter-Light.ttf",
      weight: "300",
    },
    {
      path: "../public/fonts/Inter/Inter-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/Inter/Inter-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/Inter/Inter-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../public/fonts/Inter/Inter-Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/Inter/Inter-ExtraBold.ttf",
      weight: "800",
    },
    {
      path: "../public/fonts/Inter/Inter-Black.ttf",
      weight: "900",
    },
  ],
});

export const metadata: Metadata = {
  title: "DNA",
  description: "DNA AXA SERVICE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
