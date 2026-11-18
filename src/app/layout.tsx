import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Точка Успеха — SEO агентство",
    template: "%s | Точка Успеха",
  },
  description:
    "SEO агентство «Точка Успеха» — аудит, продвижение, аналитика. Помогаем бизнесу расти в поисковых системах.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${mulish.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
