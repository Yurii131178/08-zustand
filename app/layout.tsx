import type { Metadata } from 'next';

import './globals.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Roboto } from 'next/font/google';

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'NoteHub - your assistant for note management. Create, sort by categories, and boost productivity with our intuitive app!',
  keywords:
    'notes, NoteHub, note manager, organization, personal organizer, daily planner',
  openGraph: {
    title: 'NoteHub - Your Ultimate Note-Taking Assistant',
    description:
      'Manage your notes effortlessly with NoteHub. Create, organize by categories, and enhance productivity',
    url: 'https://08-zustand-theta.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'NoteHub - Note Management App Logo',
        width: 1200,
        height: 630,
      },
    ],
    type: 'article',
  },
};

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
