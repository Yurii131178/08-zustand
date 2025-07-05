import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Tag } from '@/types/note';
import type { Metadata } from 'next';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const { slug } = params;
  const tag = slug.length > 0 && slug[0] !== 'All' ? (slug[0] as Tag) : 'All';

  const title = tag === 'All' ? 'All Notes' : `${tag} Notes`;
  const description =
    tag === 'All'
      ? 'View all available notes sorted by date created.'
      : `View notes filtered by tag «${tag}».`;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const url = `${baseUrl}/notes/filter/${slug.join('/') || 'All'}`;
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub - Note Management App Logo',
        },
      ],
    },
  };
}

const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const tag =
    slug.length > 0 && slug[0] !== 'All' ? (slug[0] as Tag) : undefined;
  const initialNotesData = await fetchNotes('', 1, tag);

  return <NotesClient initialNotesData={initialNotesData} tag={tag} />;
};

export default Notes;
