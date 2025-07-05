'use client';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createNote } from '@/lib/api';
import type { NewNoteData } from '@/types/note';
import css from './NoteForm.module.css';

const NoteForm = () => {
  const [formData, setFormData] = useState<NewNoteData>({
    title: '',
    content: '',
    tag: 'Todo',
  });
  const [status, setStatus] = useState('');
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const savedDraft = localStorage.getItem('noteDraft');
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
      setStatus('Чернетка завантажена');
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearDraft = () => {
    localStorage.removeItem('noteDraft');
    setFormData({ title: '', content: '', tag: 'Todo' });
    setStatus('Чернетка очищена');
  };

  const handleSubmit = async (formData: FormData) => {
    const noteData: NewNoteData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as
        | 'Todo'
        | 'Work'
        | 'Personal'
        | 'Meeting'
        | 'Shopping',
    };
    await createNote(noteData);
    queryClient.invalidateQueries({ queryKey: ['notes'] });
    clearDraft();
    setStatus('Note created');
    router.push('/notes/filter/All'); // Редирект на сторінку з нотатками
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label className={css.label} htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={css.input}
          required
        />
      </div>
      <div className={css.formGroup}>
        <label className={css.label} htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={formData.content}
          onChange={handleChange}
          className={css.textarea}
          required
        />
      </div>
      <div className={css.formGroup}>
        <label className={css.label} htmlFor="tag">
          Tag
        </label>
        <select
          id="tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className={css.select}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className={css.buttonGroup}>
        <Link href="/notes/filter/All" className={css.cancelBtn}>
          Cancel
        </Link>
        <button type="submit" className={css.submitBtn}>
          Create Note
        </button>
      </div>
      {status && <p className={css.status}>{status}</p>}
    </form>
  );
};

export default NoteForm;
