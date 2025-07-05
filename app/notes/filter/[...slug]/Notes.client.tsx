'use client';

import { useState } from 'react';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { useDebounce } from 'use-debounce';
import type { FetchNotesResponse } from '@/lib/api';
import { Tag } from '@/types/note';

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //FETCHING & SEARCHING NOTES
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
    <>
      <div className={css.app}>
        {/* -------HEADER ELEMENTS (TOOLBAR)--------- */}

        <div className={css.toolbar}>
          {/* Контейнер для SearchBox (зліва) */}
          <div className={css.searchBoxContainer}>
            <SearchBox value={inputValue} onSearch={handleSearchChange} />
          </div>

          {/* Контейнер для пагінації (по центру) */}
          <div className={css.paginationContainer}>
            {totalPages > 0 && ( // Залишаємо умову рендерингу пагінації
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </div>

          {/* Кнопка "Create note +" (справа) */}
          <button
            onClick={() => setIsModalOpen(true)}
            className={css.createNoteButton} // Змінено на createNoteButton, як обговорювалось раніше
          >
            Create note +
          </button>
        </div>

        {/* -------NOTELIST--------- */}

        <NoteList notes={notes.data?.notes ?? []} />

        {/* -------NOTE MODAL--------- */}

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </div>
    </>
  );
}
