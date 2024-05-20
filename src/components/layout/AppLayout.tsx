import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Menu from '../Menu';
import LogoutButton from '../LogoutButton';
import Loader from '../loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import styles from './AppLayout.module.scss';

export default function AppLayout() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer
        theme="dark"
        autoClose={1000}
        hideProgressBar
        newestOnTop
      />
      {user ? (
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
          <div className={styles.right__section}>
            <Outlet />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
