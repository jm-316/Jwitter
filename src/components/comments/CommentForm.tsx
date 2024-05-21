import styles from './CommentForm.module.scss';

export default function CommentForm() {
  return (
    <form className={styles.comment__form}>
      <textarea
        className={styles.comment__form__textarea}
        placeholder="답글 게시하기"
      />
      <div className={styles.comment__form__submitArea}>
        <button className={styles.comment__form__btn}>답글</button>
      </div>
    </form>
  );
}
