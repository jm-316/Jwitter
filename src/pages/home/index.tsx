import { LuImage } from 'react-icons/lu';
import { FaUserCircle, FaRegHeart, FaRegCommentDots } from 'react-icons/fa';
import { IoSearchSharp } from 'react-icons/io5';

import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
}

const posts: PostProps[] = [
  {
    id: '1',
    email: 'test@test.com',
    content: '12334',
    createdAt: '2024-05-17',
    uid: '1234',
  },
  {
    id: '2',
    email: 'test@test.com',
    content: '12334',
    createdAt: '2024-05-17',
    uid: '1234',
  },
  {
    id: '3',
    email: 'test@test.com',
    content: '12334',
    createdAt: '2024-05-17',
    uid: '1234',
  },
  {
    id: '4',
    email: 'test@test.com',
    content: '12334',
    createdAt: '2024-05-17',
    uid: '1234',
  },
];

export default function Home() {
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
        <form className={styles.postForm}>
          <div className={styles.postForm__content}>
            <img
              src="./vite.svg"
              alt="profile"
              className={styles.postForm__contentImg}
            />
            <textarea
              className={styles.postForm__textarea}
              name="content"
              id="content"
              required
              placeholder="무슨 일이 일어나고 있나요?"
            />
          </div>
          <div className={styles.postForm__submitArea}>
            <label htmlFor="file-input" className={styles.postForm__file}>
              <LuImage className={styles.postForm__fileIcon} />
            </label>
            <input
              type="file"
              name="file-input"
              id="file-input"
              accept="image/*"
              className={styles.hidden}
            />
            <button className={styles.postForm__btn}>게시하기</button>
          </div>
        </form>
        <div className={styles.post}>
          {posts?.map((post) => (
            <div key={post.id} className={styles.post__box}>
              <div className={styles.post__boxProfile}>
                <div className={styles.post__flex}>
                  {post?.profileUrl ? (
                    <img src={post?.profileUrl} alt="profile" />
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
                      <div className={styles.post__boxContent}>
                        {post.content}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.post__boxFooter}>
                <>
                  <button type="button" className={styles.post__delete}>
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
