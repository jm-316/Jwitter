import { Link, useNavigate } from 'react-router-dom';
import {
  FaHeart,
  FaRegCommentDots,
  FaRegHeart,
  FaUserCircle,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { DeletePost, addLike, removeLike } from '../../api/firebase';
import AuthContext from '../context/AuthContext';
import FollowingBox from '../follow/FollowingBox';
import { PostListProps, PostProps } from '../../type';
import styles from './PostList.module.scss';

export default function PostList({ post }: PostListProps) {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleDelete = async (post: PostProps) => {
    const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?');

    if (confirm) {
      await DeletePost(post);
    }
    toast.success('게시글이 삭제되었습니다.');
    navigate('/');
  };

  const toggleLike = async () => {
    if (!user) return;

    if (user?.uid && post?.likes?.includes(user?.uid)) {
      await removeLike(post, user);
    } else {
      await addLike(post, user);
    }
  };

  return (
    <div className={styles.post}>
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
              <div className={styles.test}>
                <div className={styles.post__flex}>
                  <div className={styles.post__email}>{post?.email}</div>
                  <div className={styles.post__createdAt}>
                    {post?.createdAt}
                  </div>
                </div>
              </div>
              <Link to={`/posts/${post?.id}`}>
                <div className={styles.post__boxContent}>{post.content}</div>
              </Link>
            </div>
            <div className={styles.post__followingBox}>
              <FollowingBox post={post} />
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
          <div className={styles.post__hashtagsOutputs}>
            {post?.hashTags?.map((tag) => (
              <span className={styles.post__hashtagsTag} key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        </Link>
        <div className={styles.post__boxFooter}>
          {user?.uid === post?.uid && (
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
          )}
          <button
            type="button"
            className={styles.post__likes}
            onClick={toggleLike}
          >
            {user && post?.likes?.includes(user?.uid) ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}
            {post?.likeCount || 0}
          </button>
          <button type="button" className={styles.post__comments}>
            <FaRegCommentDots />
            {post?.comments?.length || ''}
          </button>
        </div>
      </div>
    </div>
  );
}
