import { IoSearchSharp } from 'react-icons/io5';
import PostForm from '../../components/posts/PostForm';
import PostList from '../../components/posts/PostList';
import styles from './Home.module.scss';
import usePosts from '../../hooks/usePosts';

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
