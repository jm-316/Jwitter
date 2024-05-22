import styles from './CommentList.module.scss';

export default function CommentList() {
  return (
    <div className={styles.comment}>
      <div className={styles.comment__wrapper}>
        <div className={styles.comment__profileBox}>
          <img src="./vite/svg" />
        </div>
        <div className={styles.comment__contentBox}>
          <div className={styles.comment__flexBox}>
            <div className={styles.comment__email}>email</div>
            <div className={styles.comment__createdAt}>2024</div>
          </div>
          <div>님에게 보내는 답글</div>
          <div>content</div>
          <div></div>
          <div className={styles.comment__submitDiv}>
            <button>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}
