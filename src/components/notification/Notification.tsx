import { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import Search from '../search/Search';
import { NotificationProps } from '../../type';
import AuthContext from '../context/AuthContext';
import { getNotifications } from '../../api/firebase';
import NotificationBox from './NotificationBox';
import styles from './Notification.module.scss';

export default function Notification() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getNotifications(user?.uid, setNotifications);
    }
  }, [user]);

  return (
    <>
      <div className={styles.home}>
        <Header />
        <div>
          {notifications?.length > 0 ? (
            notifications.map((notification) => (
              <NotificationBox
                notification={notification}
                key={notification.id}
              />
            ))
          ) : (
            <div className={styles.notification__noPost}>
              <div className={styles.notification__noPost__text}>
                알림이 없습니다.
              </div>
            </div>
          )}
        </div>
      </div>
      <Search isHome={true} />
    </>
  );
}
