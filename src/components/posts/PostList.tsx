import { Link, useNavigate } from 'react-router-dom';
import { FaRegCommentDots, FaRegHeart, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { DeletePost } from '../../api/firebase';
import usePosts from '../../hooks/usePosts';
import { PostProps } from '../../type';
import styles from './PostList.module.scss';

export default function PostList() {
  const { posts } = usePosts();

  const navigate = useNavigate();

  const handleDelete = async (post: PostProps) => {
    const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?');

    if (confirm) {
      await DeletePost(post);
    }
    toast.success('게시글이 삭제되었습니다.');
    navigate('/');
  };

  return (
    <div className={styles.post}>
      {posts?.map((post) => (
        <div key={post.id} className={styles.post__box}>
          <div className={styles.post__boxProfile}>
            <div className={styles.post__flex}>
              {post?.profileUrl ? (
                <img
                  src={post?.profileUrl}
                  alt="profile"
                  className={styles.post__profileImage}
                />
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
          <Link to={`/posts/${post?.id}`}>
            {post?.imageUrl && (
              <div className={styles.post__imageDiv}>
                <img
                  src={post?.imageUrl}
                  alt="post__image"
                  width={100}
                  height={100}
                />
              </div>
            )}
          </Link>
          <div className={styles.post__boxFooter}>
            <>
              <button
                type="button"
                className={styles.post__delete}
                onClick={() => handleDelete(post)}
              >
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
