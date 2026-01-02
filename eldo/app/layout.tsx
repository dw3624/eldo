import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Providers } from './providers';
// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'ELDO',
  description: 'Eldo - Financial Insight without Barriers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased dark:bg-black`}
        // className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black`}
      >
        <Header />
        <div className="flex min-h-[calc(100vh-52px)] flex-col">
          <Providers>
            <NuqsAdapter>{children}</NuqsAdapter>
          </Providers>
          <Footer />
        </div>
      </body>
    </html>
  );
}
