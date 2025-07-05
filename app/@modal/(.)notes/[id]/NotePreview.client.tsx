// 'use client';
// import css from './NotePreview.module.css';
// import { useParams, useRouter } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';
// import { fetchNoteById } from '@/lib/api';
// import Modal from '@/components/Modal/Modal';
// import { useCallback } from 'react';

// const NotePreviewClient = () => {
//   const { id } = useParams();

//   const { data: note } = useQuery({
//     queryKey: ['note', id],
//     queryFn: () => fetchNoteById(Number(id)),
//     refetchOnMount: false,
//   });

//   const router = useRouter();
//   const onClose = useCallback(() => {
//     router.back();
//   }, [router]);

//   if (!note) return <p>Note not found</p>;

//   const date = new Date(note.createdAt);
//   const formattedDate = date.toLocaleString('uk-UA', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//   });

//   return (
//     <Modal onClose={onClose}>
//       <div className={css.container}>
//         <p>{note.tag}</p>
//         <div className={css.item}>
//           <div className={css.header}>
//             <h2>{note.title}</h2>
//             <button className={css.editBtn}>Edit note</button>
//           </div>
//           <p className={css.content}>{note.content}</p>
//           <p className={css.date}>{formattedDate}</p>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default NotePreviewClient;

///////////////////////////////

'use client';
import css from './NotePreview.module.css';
import { useParams, useRouter } from 'next/navigation'; // useRouter вже імпортований
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import { useCallback } from 'react';

const NotePreviewClient = () => {
  const { id } = useParams();
  const router = useRouter(); // useRouter вже використовується

  const { data: note } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(Number(id)),
    refetchOnMount: false,
  });

  // Ця функція onClose вже є і викликається при кліку на бекдроп або Esc
  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  if (!note) return <p>Note not found</p>;

  const date = new Date(note.createdAt);
  const formattedDate = date.toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        <p>{note.tag}</p>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button className={css.editBtn}>Edit note</button>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
          {/* add Close butoon */}
          <button onClick={onClose} className={css.closeButton}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
