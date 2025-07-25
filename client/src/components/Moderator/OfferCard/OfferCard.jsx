import React from 'react';
import styles from './OfferCard.module.sass';
import CONSTANTS from '../../../constants';

const OfferCard = ({ offer, onModerate, handleImageError }) => {
  const { id, Contest, contestId, text, fileName, status } = offer;
  return (
    <div className={styles.offerCard}>
      <div className={styles.contestInfo}>
        <div className={styles.contestInfoTitle}>Contest info:</div>
        <div>Title: {Contest?.title || contestId}</div>
        {Contest?.industry && <div>Industry: {Contest.industry}</div>}
        {Contest?.styleName && <div>Style name: {Contest.styleName}</div>}
        {Contest?.brandStyle && <div>Brand style: {Contest.brandStyle}</div>}
      </div>
      <div className={styles.offerContent}>
        {text && <div className={styles.offerText}>{text}</div>}
        {fileName && (
          <img
            className={styles.offerImage}
            src={`${CONSTANTS.publicURL}${fileName}`}
            alt='offer file'
            onError={handleImageError}
          />
        )}
      </div>
      <div className={styles.actions}>
        {status === 'pending' ? (
          <>
            <button
              type='button'
              className={styles.approveBtn}
              onClick={() => onModerate(id, 'approve')}
              aria-label='Approve offer'
            >
              Approve
            </button>
            <button
              type='button'
              className={styles.rejectBtn}
              onClick={() => onModerate(id, 'reject')}
              aria-label='Reject offer'
            >
              Reject
            </button>
          </>
        ) : (
          <span className={styles.status}>{status}</span>
        )}
      </div>
    </div>
  );
};

export default OfferCard;
