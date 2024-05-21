import { IoIosArrowBack } from 'react-icons/io';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router';

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className={styles.post__header}>
      <button type="button" onClick={() => navigate(-1)}>
        <IoIosArrowBack className={styles.post__header__btn} />
      </button>
    </div>
  );
}
