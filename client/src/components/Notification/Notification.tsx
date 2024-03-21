import React from 'react'
import styles from './Notification.module.scss';

export interface NotificationProps {
  type: string | null;
  message: string | null;
}

const Notification: React.FC<NotificationProps> = ({type, message}) => {
  const error = <div className={styles.errorMsg}>
    <p>Something gone wrong!</p>
    <p>{message}</p>
  </div>;

  const success = <div className={styles.errorMsg}>
    <p>Success!</p>
    <p>{message}</p>
  </div>;

  const info = <div className={styles.errorMsg}>
    <p>Notification</p>
    <p>{message}</p>
  </div>;

  const generateNotification = (): JSX.Element | null => {
    switch(type) {
      case 'error':
        return error;
      case 'success':
        return success;
      case 'info':
        return info;
      default:
         return null;
      
    }
  };

  return (
    <div className={styles.notification}>
      {generateNotification()}
    </div>
  )
}

export default Notification