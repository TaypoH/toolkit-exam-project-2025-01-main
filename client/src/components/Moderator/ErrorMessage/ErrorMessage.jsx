import React from 'react';
import styles from './ErrorMessage.module.sass';

const ErrorMessage = ({ message }) => (
  <div className={styles.errorMsg}>{message}</div>
);

export default ErrorMessage;
