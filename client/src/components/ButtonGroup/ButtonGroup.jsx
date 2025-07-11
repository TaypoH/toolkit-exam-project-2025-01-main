import React from 'react';
import styles from './ButtonGroup.module.sass';
import options from './ButtonGroupOptions';

const ButtonGroup = ({ value, onChange, error, disabled }) => (
  <div className={styles.buttonGroup}>
    <div className={styles.optionsRow}>
      {options.map(opt => (
        <button
          key={opt.value}
          type='button'
          className={
            styles.option +
            (value === opt.value ? ' ' + styles.selected : '') +
            (opt.recommended ? ' ' + styles.recommended : '')
          }
          onClick={() => !disabled && onChange(opt.value)}
          disabled={disabled}
        >
          {opt.recommended && (
            <span className={styles.recommendedBadge}>Recommended</span>
          )}
          <span className={styles.label}>{opt.label}</span>
          <span className={styles.description}>{opt.description}</span>
          {value === opt.value && <span className={styles.checkmark}>✓</span>}
        </button>
      ))}
    </div>
    {error && <div className={styles.error}>{error}</div>}
  </div>
);

export default ButtonGroup;
