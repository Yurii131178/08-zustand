// 'use client';

// import { tags } from '@/constants/tags';
// import css from './SidebarNotes.module.css';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const SidebarNotes = () => {
//   const path = usePathname().split('/');
//   const activeTag = path[path.length - 1];

//   return (
//     <ul className={css.menuList}>
//       {tags.map((tag) => {
//         const isActive = tag === activeTag;
//         return (
//           <li key={tag} className={css.menuItem}>
//             <Link
//               href={`/notes/filter/${tag}`}
//               className={`${css.menuLink} ${isActive ? css.active : ''} `}
//             >
//               {tag}
//             </Link>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export default SidebarNotes;

///////

import Link from 'next/link';
import { tags } from '@/constants/tags';
import css from './SidebarNotes.module.css';

const allTags = tags.includes('All') ? tags : ['All', ...tags];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {allTags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
