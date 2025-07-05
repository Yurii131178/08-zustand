// import { useId } from 'react';
// import css from './NoteForm.module.css';
// import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import type { NewNoteData } from '../../types/note';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createNote } from '@/lib/api';

// interface NoteFormProps {
//   onClose: () => void;
// }

// const initialFormValues: NewNoteData = {
//   title: '',
//   content: '',
//   tag: 'Todo',
// };

// const NoteForm = ({ onClose }: NoteFormProps) => {
//   const fieldId = useId();
//   const queryClient = useQueryClient();

//   //SENDING FORM ON SUBMIT

//   const handleSubmit = (
//     values: NewNoteData,
//     actions: FormikHelpers<NewNoteData>,
//   ) => {
//     mutate(values);
//     actions.resetForm();
//   };

//   //SENDING

//   const { mutate } = useMutation({
//     mutationFn: (values: NewNoteData) => createNote(values),
//     onSuccess: () => {
//       onClose();
//       queryClient.invalidateQueries({ queryKey: ['notes'] });
//     },
//   });

//   //VALIDATION WITH YUP

//   const validationSchema = Yup.object().shape({
//     title: Yup.string()
//       .required("Title can't be empty")
//       .min(3, 'Title must be at least 3 characters')
//       .max(50, 'Title is too long'),

//     content: Yup.string().max(500, 'Note is too long'),

//     tag: Yup.string()
//       .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
//       .required('Tag is required'),
//   });

//   return (
//     <Formik
//       initialValues={initialFormValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       <Form className={css.form}>
//         {/* -----Title input field----- */}

//         <div className={css.formGroup}>
//           <label className={css.formLabel} htmlFor={`${fieldId}-title`}>
//             Title
//           </label>
//           <Field
//             id={`${fieldId}-title`}
//             type="text"
//             name="title"
//             className={css.input}
//           />
//           <ErrorMessage name="title" component="span" className={css.error} />
//         </div>

//         {/* -----Content textarea field----- */}

//         <div className={css.formGroup}>
//           <label className={css.formLabel} htmlFor={`${fieldId}-content`}>
//             Content
//           </label>
//           <Field
//             as="textarea"
//             id={`${fieldId}-content`}
//             name="content"
//             rows="8"
//             className={css.textarea}
//           />
//           <ErrorMessage name="content" component="span" className={css.error} />
//         </div>

//         {/* -----Select tag field----- */}

//         <div className={css.formGroup}>
//           <label className={css.formLabel} htmlFor={`${fieldId}-tag`}>
//             Tag
//           </label>
//           <Field
//             as="select"
//             id={`${fieldId}-tag`}
//             name="tag"
//             className={css.select}
//           >
//             <option value="Todo">Todo</option>
//             <option value="Work">Work</option>
//             <option value="Personal">Personal</option>
//             <option value="Meeting">Meeting</option>
//             <option value="Shopping">Shopping</option>
//           </Field>
//           <ErrorMessage name="tag" component="span" className={css.error} />
//         </div>

//         {/* -----Action buttons----- */}

//         <div>
//           <button onClick={onClose} type="button" className={css.cancelButton}>
//             Cancel
//           </button>
//           <button type="submit" className={css.submitButton} disabled={false}>
//             Create note
//           </button>
//         </div>
//       </Form>
//     </Formik>
//   );
// };

// export default NoteForm;

///////////// оновлення без Formik ////////////////////

('use client');
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

  const saveDraft = () => {
    localStorage.setItem('noteDraft', JSON.stringify(formData));
    setStatus(`Чернетка збережена о ${new Date().toLocaleTimeString('uk-UA')}`);
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
    setStatus('Нотатка створена');
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
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className={css.buttonGroup}>
        <Link href="/notes" className={css.cancelBtn}>
          Скасувати
        </Link>
        <button type="button" onClick={clearDraft} className={css.cancelBtn}>
          Очистити чернетку
        </button>
        <button type="button" onClick={saveDraft} className={css.cancelBtn}>
          Зберегти чернетку
        </button>
        <button type="submit" className={css.submitBtn}>
          Створити нотатку
        </button>
      </div>
      {status && <p className={css.status}>{status}</p>}
    </form>
  );
};

export default NoteForm;
