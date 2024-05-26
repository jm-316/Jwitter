import Header from '../Header';
import Search from '../search/Search';
import styles from './Profile.module.scss';

export default function Profile() {
  return (
    <>
      <div className={styles.home}>
        <div className={styles.profile}>
          <Header />
          <div className={styles.profile__userBox}>
            <div>
              <img src="./logo.png" className={styles.profile__img} />
            </div>
            <div className={styles.profile__userInfo}>
              <div className={styles.profile__userInfo__container}>
                <div className={styles.profile__userName}>user</div>
                <div className={styles.profile__userEmail}>email</div>
              </div>
              <div>
                <button className={styles.profile__btn}>프로필 수정</button>
              </div>
            </div>
          </div>
          <div className={styles.profile__userFollower}>
            <div>0 팔로워</div>
            <div>0 팔로우 중</div>
          </div>
        </div>
      </div>
      <Search isHome={true} />
    </>
  );
}
