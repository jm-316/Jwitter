import Header from '../Header';
import Search from '../search/Search';
import styles from './ProfileEdit.module.scss';

export default function ProfileEdit() {
  return (
    <>
      <div className={styles.home}>
        <div className={styles.profile__editContainer}>
          <Header />
          <form className={styles.editForm}>
            <div className={styles.editForm__flex}>
              <div className={styles.editForm__imgBox}>
                <img src="/logo.png" className={styles.editForm__img} />
                <label htmlFor="test" className={styles.editForm__img__label}>
                  변경하기
                </label>
                <input
                  type="file"
                  name="file-input"
                  accept="image/*"
                  id="test"
                  className={styles.hidden}
                />
              </div>
              <div className={styles.editForm__profile}>
                <input
                  type="text"
                  name="displayName"
                  className={styles.editForm__profile__input}
                  placeholder="이름"
                />
                <div className={styles.editForm__profile__email}>emil</div>
              </div>
            </div>
            <div className={styles.editForm__submitArea}>
              <button className={styles.editForm__btn}>수정</button>
            </div>
          </form>
        </div>
      </div>
      <Search isHome={true} />
    </>
  );
}
