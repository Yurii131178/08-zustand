import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Tag } from '@/types/note';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const tag =
    slug.length > 0 && slug[0] !== 'All' ? (slug[0] as Tag) : undefined;
  const initialNotesData = await fetchNotes('', 1, tag);

  return <NotesClient initialNotesData={initialNotesData} tag={tag} />;
};
export default Notes;
