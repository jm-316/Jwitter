import { FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { CommentListProps } from '../../type';
import AuthContext from '../context/AuthContext';
import { deleteComment } from '../../api/firebase';
import { getErrorMessage } from '../../util/error';
import styles from './CommentList.module.scss';

export default function CommentList({ comment, post }: CommentListProps) {
  const { user } = useContext(AuthContext);

  const handleDeleteComment = async () => {
    try {
      if (post) {
        await deleteComment(post, comment);
        toast.success('댓글을 삭제했습니다.');
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.comment__wrapper}>
        <div className={styles.comment__profileBox}>
          {user?.photoURL ? (
            <img src={user?.photoURL} alt="profile" />
          ) : (
            <FaUserCircle className={styles.comment__imageIcon} />
          )}
        </div>
        <div className={styles.comment__contentBox}>
          <div className={styles.comment__flexBox}>
            <div className={styles.comment__email}>
              {comment?.email ?? '@' + comment?.uid?.slice(0, 5)}
            </div>
            <div className={styles.comment__createdAt}>
              {comment?.createdAt}
            </div>
          </div>
          <div>
            <span className={styles.comment__userName}>
              {user?.email ?? '@' + user?.uid?.slice(0, 5)}
            </span>{' '}
            님에게 보내는 답글
          </div>
          <div>{comment?.comment}</div>
          <div></div>
          <div className={styles.comment__submitDiv}>
            {comment?.uid === user?.uid && (
              <button onClick={handleDeleteComment}>삭제</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
