'use client';

import Link from 'next/link';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Pagination from '@/components/Pagination/Pagination';
import { useDebounce } from 'use-debounce';
import type { FetchNotesResponse } from '@/lib/api';
import { Tag } from '@/types/note';
import { useState } from 'react';

interface NotesClientProps {
  initialNotesData: FetchNotesResponse;
  tag?: Tag;
}

export default function NotesClient({
  initialNotesData,
  tag,
}: NotesClientProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [debouncedInputValue] = useDebounce(inputValue, 500);

  const notes = useQuery({
    queryKey: ['notes', debouncedInputValue, currentPage, tag],
    queryFn: () => fetchNotes(debouncedInputValue, currentPage, tag),
    placeholderData: keepPreviousData,
    initialData:
      !debouncedInputValue && currentPage === 1 ? initialNotesData : undefined,
  });

  const totalPages = notes.data?.totalPages ?? 0;

  const handleSearchChange = (newSearch: string) => {
    setInputValue(newSearch);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <div className={css.searchBoxContainer}>
          <SearchBox value={inputValue} onSearch={handleSearchChange} />
        </div>

        <div className={css.paginationContainer}>
          {totalPages > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

        <Link href="/notes/action/create" className={css.createNoteButton}>
          Create note +
        </Link>
      </div>

      <NoteList notes={notes.data?.notes ?? []} />
    </div>
  );
}
