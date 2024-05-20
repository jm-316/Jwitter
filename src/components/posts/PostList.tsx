import { FaRegCommentDots, FaRegHeart, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './PostList.module.scss';
import usePosts from '../../hooks/usePosts';

export default function PostList() {
  const { posts } = usePosts();
  return (
    <div className={styles.post}>
      {posts?.map((post) => (
        <div key={post.id} className={styles.post__box}>
          <div className={styles.post__boxProfile}>
            <div className={styles.post__flex}>
              {post?.profileUrl ? (
                <img src={post?.profileUrl} alt="profile" />
              ) : (
                <FaUserCircle className={styles.post__boxProfileIcon} />
              )}
              <div>
                <div className={styles.post__flex}>
                  <div className={styles.post__email}>{post?.email}</div>
                  <div className={styles.post__createdAt}>
                    {post?.createdAt}
                  </div>
                </div>
                <Link to={`/posts/${post?.id}`}>
                  <div className={styles.post__boxContent}>{post.content}</div>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.post__boxFooter}>
            <>
              <button type="button" className={styles.post__delete}>
                삭제
              </button>
              <button type="button" className={styles.post__edit}>
                <Link to={`/posts/edit/${post?.id}`}>수정</Link>
              </button>
            </>
            <button type="button" className={styles.post__likes}>
              <FaRegHeart />
            </button>
            <button type="button" className={styles.post__comments}>
              <FaRegCommentDots />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
