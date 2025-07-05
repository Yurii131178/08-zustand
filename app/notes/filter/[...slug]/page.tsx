import { Metadata } from 'next';
import { Tag } from '@/types/note';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params; // Await the Promise to get the slug
  const tag = slug.length > 0 && slug[0] !== 'All' ? (slug[0] as Tag) : 'All';

  const title = tag === 'All' ? 'All Notes' : `Notes tagged "${tag}"`;
  const description =
    tag === 'All'
      ? 'View all notes sorted by creation date.'
      : `Explore notes filtered by the "${tag}" tag.`;

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
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
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
