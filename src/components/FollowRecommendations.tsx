import { FaUserCircle } from 'react-icons/fa';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import styles from './FollowRecommendations.module.scss';

export default function FollowRecommendations() {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.follow}>
      <h3>팔로우 추천</h3>
      <div className={styles.follow__wrapper}>
        <div className={styles.follow__profile}>
          {user?.photoURL ? (
            <img src={user?.photoURL} alt="profile" />
          ) : (
            <FaUserCircle className={styles.follow__imageIcon} />
          )}
        </div>
        <div className={styles.follow__userInfo}>
          <div className={styles.follow__userInfo__name}>
            {user?.displayName ?? 'user'}
          </div>
          <div className={styles.follow__userInfo__email}>
            {user?.email ?? '@' + user?.uid?.slice(0, 5)}
          </div>
        </div>
        <div>
          <button className={styles.follow__btn}>팔로우</button>
        </div>
      </div>
    </div>
  );
}
