import { create } from 'zustand';
import { NewNoteData } from '@/types/note';
import { persist } from 'zustand/middleware';

interface NoteStore {
  draft: NewNoteData;
  setDraft: (note: Partial<NewNoteData>) => void;
  clearDraft: () => void;
}

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
