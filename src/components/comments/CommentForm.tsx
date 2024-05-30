import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { createComment, createdNotification } from '../../api/firebase';
import { getErrorMessage } from '../../util/error';
import { CommentFromProps } from '../../type';
import styles from './CommentForm.module.scss';

export default function CommentForm({ post }: CommentFromProps) {
  const [comment, setComment] = useState<string>('');
  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'comment') {
      setComment(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && post) {
      try {
        await createComment(post, comment, user);

        if (user?.uid !== post?.uid) {
          const content = `${post?.content} 글에 댓글이 작성되었습니다.`;
          const url = `/posts/${post?.id}`;
          await createdNotification(post?.uid, content, url);
        }
        toast.success('댓글을 생성했습니다.');
        setComment('');
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      }
    }
  };
  return (
    <form className={styles.comment__form} onSubmit={onSubmit}>
      <textarea
        className={styles.comment__form__textarea}
        name="comment"
        id="comment"
        value={comment}
        onChange={onChange}
        placeholder="답글 게시하기"
        required
      />
      <div className={styles.comment__form__submitArea}>
        <button
          className={styles.comment__form__btn}
          type="submit"
          disabled={!comment}
        >
          답글
        </button>
      </div>
    </form>
  );
}
