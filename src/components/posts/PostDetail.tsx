import { useParams } from 'react-router';
import { IoSearchSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { getPost } from '../../api/firebase';
import PostList from './PostList';
import Loader from '../loader/Loader';
import Header from '../Header';
import { CommentProps, PostProps } from '../../type';
import styles from './PostDetail.module.scss';
import CommentForm from '../comments/CommentForm';
import CommentList from '../comments/CommentList';

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getPost(params.id, setPost);
    }
  }, [params.id]);

  return (
    <>
      <div className={styles.home}>
        <Header />
        {post ? (
          <>
            <PostList post={post} />
            <CommentForm post={post} />
            {post?.comments
              ?.slice(0)
              ?.reverse()
              .map((comment: CommentProps) => (
                <CommentList
                  comment={comment}
                  post={post}
                  key={comment.createdAt}
                />
              ))}
          </>
        ) : (
          <Loader />
        )}
      </div>
      <div className={styles.search}>
        <div className={styles.search__div}>
          <IoSearchSharp className={styles.search__icon} />
          <input placeholder="해시태그 검색" className={styles.search__input} />
        </div>
        <div className={styles.search__post}>검색 내역이 없습니다.</div>
      </div>
    </>
  );
}
