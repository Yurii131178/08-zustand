// import { Metadata } from 'next';
// import { fetchNoteById } from '@/lib/api';
// import NoteDetailsClient from './NoteDetails.client';
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from '@tanstack/react-query';

// interface NoteDetailsProps {
//   params: Promise<{ id: string }>;
// }

// export async function generateMetadata({
//   params,
// }: NoteDetailsProps): Promise<Metadata> {
//   const { id } = await params;
//   const note = await fetchNoteById(Number(id));

//   const title = note?.title || 'Note not found';
//   const description = note ? 'Read this Note' : 'This Note was not found';

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url: `/notes/${id}`,
//       images: [
//         {
//           url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
//           alt: 'NoteHub - Note Management App Logo',
//           width: 1200,
//           height: 630,
//         },
//       ],
//     },
//   };
// }

// const NoteDetails = async ({ params }: NoteDetailsProps) => {
//   const { id } = await params;
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ['note', id],
//     queryFn: () => fetchNoteById(Number(id)),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NoteDetailsClient />
//     </HydrationBoundary>
//   );
// };

// export default NoteDetails;

//////////////////////////

import type { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(Number(id));

  const title = note?.title || 'Note not found';

  const description = note
    ? `${note.content.slice(0, 100)}${note.content.length > 100 ? '...' : ''}`
    : 'The requested note was not found in NoteHub. Explore other notes or create a new one.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          // NEW: Змінюємо alt-текст для випадку відсутності нотатки
          alt: note
            ? 'NoteHub - Note Management App Logo'
            : 'NoteHub - Note Not Found',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(Number(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
