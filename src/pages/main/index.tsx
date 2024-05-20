import { Link } from 'react-router-dom';
import styles from './MainPage.module.scss';

export default function MainPage() {
  return (
    <div className={styles.main}>
      <div className={styles.main__left}>
        <img src="./logo.png" alt="logo" />
      </div>
      <div className={styles.main__right}>
        <h1>지금 일어나고 있는 일</h1>
        <h2>지금 가입하세요.</h2>
        <Link to="/users/signup" className={styles.main__right__btnSignup}>
          계정 만들기
        </Link>
        <h3>이미 트위터에 가입하셨나요?</h3>
        <Link to="/users/login" className={styles.main__right__btnLogin}>
          로그인
        </Link>
      </div>
    </div>
  );
}
