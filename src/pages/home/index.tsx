import { useState } from 'react';
import PostForm from '../../components/posts/PostForm';
import PostList from '../../components/posts/PostList';
import Search from '../../components/search/Search';
import usePosts from '../../hooks/usePosts';
import useFollowingPosts from '../../hooks/useFollowingPosts';
import { TabType } from '../../type';
import styles from './Home.module.scss';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const { posts } = usePosts();
  const { followingPosts } = useFollowingPosts();

  return (
    <>
      <div className={styles.home}>
        <div className={styles.home__title}>홈</div>
        <div className={styles.home__tabs}>
          <div
            className={`${activeTab === 'all' && styles.home__tabActive} ${styles.home__tab}`}
            onClick={() => setActiveTab('all')}
          >
            추천
          </div>
          <div
            className={`${activeTab === 'following' && styles.home__tabActive} ${styles.home__tab}`}
            onClick={() => setActiveTab('following')}
          >
            팔로우
          </div>
        </div>
        <PostForm />
        {activeTab === 'all' &&
          (posts?.length > 0 ? (
            posts.map((post) => <PostList post={post} key={post.id} />)
          ) : (
            <div className={styles.post__noPost}>
              <div className={styles.post__text}>게시물이 없습니다.</div>
            </div>
          ))}
        {activeTab === 'following' &&
          (followingPosts?.length > 0 ? (
            followingPosts.map((post) => <PostList post={post} key={post.id} />)
          ) : (
            <div className={styles.post__noPost}>
              <div className={styles.post__text}>게시물이 없습니다.</div>
            </div>
          ))}
      </div>
      <Search isHome={true} />
    </>
  );
}
