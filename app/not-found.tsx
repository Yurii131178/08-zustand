import { Metadata } from 'next';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: '404 - Page Not Found | NoteHub',
  description: 'Sorry, the page you are looking for does not exist',
  openGraph: {
    title: '404 - Page Not Found | NoteHub',
    description: 'Sorry, the page you are looking for does not exist',
    url: 'https://notehub.com/404',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'NoteHub 404',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
