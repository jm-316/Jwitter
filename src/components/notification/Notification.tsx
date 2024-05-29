import Header from '../Header';
import Search from '../search/Search';
import styles from './Notification.module.scss';

export default function Notification() {
  return (
    <>
      <div className={styles.home}>
        <Header />
        <div>
          <div className={styles.notification}>
            <div className={styles.notification__flex}>
              <div className={styles.notification__createdAt}>
                <div>2024-12-21</div>
              </div>
              <div className={styles.notification__unread} />
            </div>
            <div className={styles.notification__content}>content</div>
          </div>
        </div>
      </div>
      <Search isHome={true} />
    </>
  );
}
