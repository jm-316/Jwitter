import { useNavigate } from 'react-router';
import { NotificationProps } from '../../type';
import { updateNotification } from '../../api/firebase';
import styles from './NotificationBox.module.scss';

export default function NotificationBox({
  notification,
}: {
  notification: NotificationProps;
}) {
  const navigate = useNavigate();

  const onClickNotification = async (id: string, url: string) => {
    await updateNotification(id);

    navigate(url);
  };

  return (
    <div className={styles.notification} key={notification.id}>
      <div
        className={styles.notification__flex}
        onClick={() => onClickNotification(notification.id, notification.url)}
      >
        <div className={styles.notification__createdAt}>
          <div>{notification.createdAt}</div>
        </div>
        {notification?.isRead === false && (
          <div className={styles.notification__unread} />
        )}
      </div>
      <div
        className={styles.notification__content}
        onClick={() => onClickNotification(notification.id, notification.url)}
      >
        {notification.content}
      </div>
    </div>
  );
}
