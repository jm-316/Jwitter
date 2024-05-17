import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import Menu from '../Menu';
import LogoutButton from '../LogoutButton';
import styles from './AppLayout.module.scss';

export default function AppLayout() {
  return (
    <div className={styles.container}>
      <header className={styles.left__section__wrapper}>
        <section className={styles.left__section}>
          <div className={styles.left__sectionFixed}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoPill}>
                <img src="./logo.png" alt="logo" width={60} height={60} />
              </div>
            </Link>
          </div>
        </section>
        <Menu />
        <LogoutButton />
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
