import PostForm from '../../components/posts/PostForm';
import PostList from '../../components/posts/PostList';
import Search from '../../components/search/Search';
import usePosts from '../../hooks/usePosts';
import styles from './Home.module.scss';

export default function Home() {
  const { posts } = usePosts();
  return (
    <>
      <div className={styles.home}>
        <div className={styles.home__title}>홈</div>
        <div className={styles.home__tabs}>
          <div className={`${styles.home__tabActive} ${styles.home__tab}`}>
            추천
          </div>
          <div className={styles.home__tab}>팔로우</div>
        </div>
        <PostForm />
        {posts?.length > 0 ? (
          posts.map((post) => <PostList post={post} key={post.id} />)
        ) : (
          <div>
            <div>게시물이 없습니다.</div>
          </div>
        )}
      </div>
      <Search isHome={true} />
    </>
  );
}
