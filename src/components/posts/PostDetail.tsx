import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getPost } from '../../api/firebase';
import PostList from './PostList';
import Loader from '../loader/Loader';
import Header from '../Header';
import { CommentProps, PostProps } from '../../type';
import CommentForm from '../comments/CommentForm';
import CommentList from '../comments/CommentList';
import Search from '../search/Search';
import styles from './PostDetail.module.scss';

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
      <Search isHome={true} />
    </>
  );
}
