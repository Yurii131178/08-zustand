import { create } from 'zustand';
import { NewNoteData } from '@/types/note';

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

export const useNoteDraftStore = create<NoteStore>()((set) => ({
  draft: initialDraft,

  setDraft: (note) =>
    set((state) => ({
      draft: { ...state.draft, ...note },
    })),
  clearDraft: () => set({ draft: initialDraft }),
}));
