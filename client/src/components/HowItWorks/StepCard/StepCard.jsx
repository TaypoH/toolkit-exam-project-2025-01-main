import React, { memo } from 'react';
import styles from './StepCard.module.sass';

const StepCard = memo(({ title, desc, showArrow }) => (
  <div className={styles.stepCard}>
    <div className={styles.stepCap}>
      <span>{title}</span>
    </div>
    <p>{desc}</p>
    {showArrow && (
      <div className={styles.stepArrow} aria-hidden='true'>
        <svg
          width='40'
          height='24'
          viewBox='0 0 40 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2 12H38M38 12L29 3M38 12L29 21'
            stroke='#B1B7D6'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    )}
  </div>
));

export default StepCard;
