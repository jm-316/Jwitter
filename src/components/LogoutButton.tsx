import styles from './LogoutButton.module.scss';

export default function LogoutButton() {
  return (
    <button className={styles.logOut__btn}>
      <div className={styles.logOut__btn__image}>
        <img src="./vite.svg" alt="profile" />
      </div>
      <div className={styles.logOut__btn__username}>
        <div>name</div>
        <div>email</div>
      </div>
    </button>
  );
}
