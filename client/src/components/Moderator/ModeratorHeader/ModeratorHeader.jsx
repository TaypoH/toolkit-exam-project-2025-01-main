import React from 'react';
import styles from './ModeratorHeader.module.sass';

const ModeratorHeader = ({ onRefresh }) => (
  <div className={styles.headerRow}>
    <h2 className={styles.moderatorTitle}>Offers Moderation</h2>
    <button type='button' className={styles.refreshBtn} onClick={onRefresh}>
      Refresh
    </button>
  </div>
);

export default ModeratorHeader;
