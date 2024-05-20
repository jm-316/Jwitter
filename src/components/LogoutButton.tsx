import { FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { logOut } from '../api/firebase';
import AuthContext from './context/AuthContext';
import styles from './LogoutButton.module.scss';

export default function LogoutButton() {
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    await logOut();
    toast.success('로그아웃 되었습니다.');
  };

  return (
    <button className={styles.logOut__btn} type="button" onClick={handleLogout}>
      <div className={styles.logOut__btn__image}>
        {user?.photoURL ? (
          <img src={user?.photoURL} alt="profile" />
        ) : (
          <FaUserCircle className={styles.logOut__btn__imageIcon} />
        )}
      </div>
      <div className={styles.logOut__btn__username}>
        <div>{user?.displayName ?? 'user'}</div>
        <div>{user?.email ?? '@' + user?.uid?.slice(0, 5)}</div>
      </div>
    </button>
  );
}
