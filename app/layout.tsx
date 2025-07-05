import type { Metadata } from 'next';

import './globals.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

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
    url: '', // після деплою додам сюди посилання типу 'https://yurii131178.github.io/0000000000000000000/'
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'NoteHub - Note Management App Logo',
        width: '1200',
        height: '630',
      },
    ],
    type: 'article',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
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
