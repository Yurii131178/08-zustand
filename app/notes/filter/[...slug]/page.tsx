import { Metadata } from 'next';
import { Tag } from '@/types/note'; // Оригінальний тип Tag для нотаток
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type FilterTag = Tag | 'All';
interface NotesProps {
  params: Promise<{ slug: string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const resolvedParams = await params;
  let slug: string[] = [];

  if (Array.isArray(resolvedParams.slug)) {
    slug = resolvedParams.slug;
  } else {
    slug = ['All'];
  }

  const rawTag = slug.length > 0 ? slug[0] : 'All';

  let tag: FilterTag;

  if (rawTag === 'All') {
    tag = 'All';
  } else {
    tag = rawTag as Tag;
  }
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
  const resolvedParams = await params;
  let slug: string[] = [];

  if (Array.isArray(resolvedParams.slug)) {
    slug = resolvedParams.slug;
  } else {
    slug = ['All'];
  }

  const rawTag = slug.length > 0 ? slug[0] : 'All';

  let tag: Tag | undefined;

  if (rawTag === 'All') {
    tag = undefined;
  } else {
    tag = rawTag as Tag;
  }

  const initialNotesData = await fetchNotes('', 1, tag);

  return <NotesClient initialNotesData={initialNotesData} tag={tag} />;
};

export default Notes;
