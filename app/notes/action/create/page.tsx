import NoteForm from '@/components/NoteForm/NoteForm';
import styles from './CreateNote.module.css';

export const metadata = {
  title: 'Create Note - My Notes App',
  description: 'Create a new note in your personal notes application.',
  url: 'https://your-app-domain.com/notes/action/create',
  openGraph: {
    title: 'Create a New Note',
    description: 'Start writing a new note in our intuitive notes app.',
    url: 'https://your-app-domain.com/notes/action/create',
    images: [
      {
        url: 'https://your-app-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Create Note - My Notes App',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
