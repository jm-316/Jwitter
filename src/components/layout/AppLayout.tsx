import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { BsHouse } from 'react-icons/bs';
import { IoIosSearch } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';

import styles from './AppLayout.module.scss';

export default function AppLayout() {
  return (
    <div className={styles.container}>
      <header className={styles.left__section__wrapper}>
        <section className={styles.left__section}>
          <div className={styles.left__sectionFixed}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoPill}>
                <img src="./logo.png" alt="logo" width={60} height={60} />
              </div>
            </Link>
          </div>
        </section>
        <nav>
          <li>
            <Link to="/">
              <div className={styles.navPill}>
                <BsHouse className={styles.navIcon} />
                <span>홈</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <div className={styles.navPill}>
                <IoIosSearch className={styles.navIcon} />
                <span>탐색하기</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/notifications">
              <div className={styles.navPill}>
                <IoMdNotificationsOutline className={styles.navIcon} />
                <span>알림</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <div className={styles.navPill}>
                <FaUserCircle className={styles.navIcon} />
                <span>프로필</span>
              </div>
            </Link>
          </li>
        </nav>
        <button className={styles.logOut__btn}>
          <div className={styles.logOut__btn__image}>
            <img src="./vite.svg" alt="profile" />
          </div>
          <div className={styles.logOut__btn__username}>
            <div>name</div>
            <div>email</div>
          </div>
        </button>
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

{
  /* <div className={style.container}>
  <RQProvider>
    <header className={style.leftSectionWrapper}>
      <section className={style.leftSection}>
        <div className={style.leftSectionFixed}>
          <Link className={style.logo} href={session?.user ? '/home' : '/'}>
            <div className={style.logoPill}>
              <Image src={ZLogo} alt="z.com로고" width={40} height={40} />
            </div>
          </Link>
          {session?.user && (
            <>
              <nav>
                <ul>
                  <NavMenu />
                </ul>
                <Link href="/compose/tweet" className={style.postButton}>
                  <span>게시하기</span>
                  <svg
                    viewBox="0 0 24 24"
                    width={24}
                    aria-hidden="true"
                    className="r-jwli3a r-4qtqp9 r-yyyyoo r-1472mwg r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"
                  >
                    <g>
                      <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
                    </g>
                  </svg>
                </Link>
              </nav>
              <LogoutButton me={session} />
            </>
          )}
        </div>
      </section>
    </header>
    <div className={style.rightSectionWrapper}>
      <div className={style.rightSectionInner}>
        <main className={style.main}>{children}</main>
        <section className={style.rightSection}>
          <RightSearchZone />
          <TrendSection />
          <div className={style.followRecommend}>
            <h3>팔로우 추천</h3>
            <FollowRecommendSection />
          </div>
        </section>
      </div>
    </div>
    {modal}
  </RQProvider>
</div>; */
}
