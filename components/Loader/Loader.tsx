import css from './Loader.module.css';
import { PuffLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className={css.loader}>
      <PuffLoader color="blue" />
      <p className={css.text}>Loading, please wait...</p>
    </div>
  );
}
