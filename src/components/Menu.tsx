import { Link } from 'react-router-dom';
import { BsHouse } from 'react-icons/bs';
import { IoIosSearch } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';

import styles from './Menu.module.scss';

export default function Menu() {
  return (
    <nav>
      <li>
        <Link to="/">
          <div className={styles.navPill}>
            <BsHouse className={styles.navIcon} />
            <span className={styles.navPill__text}>홈</span>
          </div>
        </Link>
      </li>
      <li>
        <Link to="/search">
          <div className={styles.navPill}>
            <IoIosSearch className={styles.navIcon} />
            <span className={styles.navPill__text}>탐색하기</span>
          </div>
        </Link>
      </li>
      <li>
        <Link to="/notifications">
          <div className={styles.navPill}>
            <IoMdNotificationsOutline className={styles.navIcon} />
            <span className={styles.navPill__text}>알림</span>
          </div>
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <div className={styles.navPill}>
            <FaUserCircle className={styles.navIcon} />
            <span className={styles.navPill__text}>프로필</span>
          </div>
        </Link>
      </li>
    </nav>
  );
}
