import { LuImage } from 'react-icons/lu';
import styles from './PostForm.module.scss';

export default function PostForm() {
  return (
    <form className={styles.postForm}>
      <div className={styles.postForm__content}>
        <img
          src="./vite.svg"
          alt="profile"
          className={styles.postForm__contentImg}
        />
        <textarea
          className={styles.postForm__textarea}
          name="content"
          id="content"
          required
          placeholder="무슨 일이 일어나고 있나요?"
        />
      </div>
      <div className={styles.postForm__submitArea}>
        <label htmlFor="file-input" className={styles.postForm__file}>
          <LuImage className={styles.postForm__fileIcon} />
        </label>
        <input
          type="file"
          name="file-input"
          id="file-input"
          accept="image/*"
          className={styles.hidden}
        />
        <button className={styles.postForm__btn}>게시하기</button>
      </div>
    </form>
  );
}
