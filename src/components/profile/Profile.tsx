import { useNavigate } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import Search from '../search/Search';
import AuthContext from '../context/AuthContext';
import { PostProps, ProfileTabType } from '../../type';
import { getFollowInfo, getLikePosts, getMyPosts } from '../../api/firebase';
import PostList from '../posts/PostList';
import styles from './Profile.module.scss';

export default function Profile() {
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);
  const [likePosts, setLikePosts] = useState<PostProps[]>([]);
  const [activeTab, setActiveTab] = useState<ProfileTabType>('my');
  const [follower, setFollower] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getMyPosts(user?.uid, setMyPosts);
      getLikePosts(user?.uid, setLikePosts);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getFollowInfo(user?.uid, 'follower', setFollower);
      getFollowInfo(user?.uid, 'following', setFollowing);
    }
  }, [user]);

  return (
    <>
      <div className={styles.home}>
        <div className={styles.profile}>
          <Header />
          <div className={styles.profile__userBox}>
            <div>
              {user?.photoURL &&
              !(user?.email && user.email.includes('gmail.com')) ? (
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className={styles.profile__img}
                />
              ) : (
                <FaUserCircle className={styles.profile__imgIcon} />
              )}
            </div>
            <div className={styles.profile__userInfo}>
              <div className={styles.profile__userInfo__container}>
                <div className={styles.profile__userName}>
                  {user?.displayName ?? 'user'}
                </div>
                <div className={styles.profile__userEmail}>
                  {user?.email ?? '@' + user?.uid?.slice(0, 5)}
                </div>
              </div>
              <div>
                <button
                  className={styles.profile__btn}
                  onClick={() => navigate('/profile/edit')}
                >
                  프로필 수정
                </button>
              </div>
            </div>
          </div>
          <div className={styles.profile__userFollower}>
            <div>{follower.length} 팔로워</div>
            <div>{following.length} 팔로우 중</div>
          </div>
        </div>
        <div className={styles.home__tabs}>
          <div
            className={`${activeTab === 'my' && styles.home__tabActive} ${styles.home__tab}`}
            onClick={() => setActiveTab('my')}
          >
            게시물
          </div>
          <div
            className={`${activeTab === 'like' && styles.home__tabActive} ${styles.home__tab}`}
            onClick={() => setActiveTab('like')}
          >
            마음에 들어요
          </div>
        </div>
        {activeTab === 'my' &&
          (myPosts?.length > 0 ? (
            myPosts.map((post) => <PostList post={post} key={post.id} />)
          ) : (
            <div className={styles.post__noPost}>
              <div className={styles.post__text}>게시물이 없습니다.</div>
            </div>
          ))}
        {activeTab === 'like' &&
          (likePosts?.length > 0 ? (
            likePosts.map((post) => <PostList post={post} key={post.id} />)
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
