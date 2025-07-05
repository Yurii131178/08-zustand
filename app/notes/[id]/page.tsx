// import { fetchNoteById } from '@/lib/api';
// import NoteDetailsClient from './NoteDetails.client';

// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from '@tanstack/react-query';
// import { Metadata } from 'next';

// interface NoteDetailsProps {
//   params: Promise<{ id: string }>;
// }

// export async function generateMetadata({
//   params,
// }: NoteDetailsProps): Promise<Metadata> {
//   const { id } = await params; // Очікуємо Promise для отримання id
//   let note;
//   try {
//     note = await fetchNoteById(Number(id)); // Отримуємо нотатку
//   } catch (error) {
//     console.error('Не вдалося отримати нотатку:', error);
//   }

//   const title = note?.title || 'Нотатка не знайдена';
//   const description = note?.content
//     ? `${note.content.slice(0, 160)}...` // Використовуємо content, обрізаємо до 160 символів
//     : note
//       ? 'Прочитайте цю нотатку, щоб дізнатися більше.'
//       : 'Цю нотатку не вдалося знайти.';

//   const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
//   const url = `${baseUrl}/notes/${id}`;
//   const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(title)}`;

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url,
//       images: [
//         {
//           url: ogImage,
//           width: 1200,
//           height: 630,
//           alt: title,
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

// /////////

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
//   const { id } = await params; // Очікуємо Promise для отримання id
//   let note;
//   try {
//     note = await fetchNoteById(Number(id)); // Отримуємо нотатку
//   } catch (error) {
//     console.error('Не вдалося отримати нотатку:', error);
//   }

//   const title = note?.title || 'Нотатка не знайдена';
//   const description = note?.content
//     ? `${note.content.slice(0, 160)}...` // Використовуємо content, обрізаємо до 160 символів
//     : note
//       ? 'Прочитайте цю нотатку, щоб дізнатися більше.'
//       : 'Цю нотатку не вдалося знайти.';

//   const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
//   const url = `${baseUrl}/notes/${id}`;
//   const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(title)}`;

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url,
//       images: [
//         {
//           url: ogImage,
//           width: 1200,
//           height: 630,
//           alt: title,
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

///////////// ver-2 ////////////////////

import { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params; // Очікуємо id
  const note = await fetchNoteById(Number(id)); // Отримуємо нотатку

  const title = note?.title || 'Note not found';
  const description = note ? 'Read this Note' : 'This Note was not found';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          alt: 'NoteHub - Note Management App Logo',
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

//////////////// без промісу /////////////////////////////

// import { Metadata } from 'next';
// import { fetchNoteById } from '@/lib/api';
// import NoteDetailsClient from './NoteDetails.client';
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from '@tanstack/react-query';

// interface NoteDetailsProps {
//   params: { id: string };
// }

// export async function generateMetadata({
//   params,
// }: NoteDetailsProps): Promise<Metadata> {
//   const { id } = params;
//   const note = await fetchNoteById(Number(id));

//   const title = note?.title || 'Note not found';
//   const description = note ? 'Read this Note' : 'This Note was not found';

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url: '', // після деплою додам сюди посилання типу 'https://yurii131178.github.io/0000000000000000000/'
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
//   const { id } = params;
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
