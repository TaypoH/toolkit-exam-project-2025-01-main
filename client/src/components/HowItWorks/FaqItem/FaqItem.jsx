import React, { memo } from 'react';
import styles from './FaqItem.module.sass';

const FaqItem = memo(({ question, answer, open, onClick, id }) =>
  open ? (
    <div className={styles.faqItemOpen}>
      <button
        className={styles.faqQuestion}
        onClick={onClick}
        type='button'
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
        id={`faq-question-${id}`}
      >
        {question}
        <span className={styles.faqIcon}>×</span>
      </button>
      <div
        className={styles.faqAnswer}
        id={`faq-answer-${id}`}
        role='region'
        aria-labelledby={`faq-question-${id}`}
      >
        <div
          className={styles.faqAnswerInner + ' ' + styles.faqAnswerInnerOpen}
        >
          {answer}
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.faqItemClosed}>
      <button
        className={styles.faqQuestionClosed}
        onClick={onClick}
        type='button'
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
        id={`faq-question-${id}`}
      >
        {question}
        <span className={styles.faqIconClosed}>+</span>
      </button>
      <div
        className={styles.faqAnswer}
        style={{
          height: 0,
          padding: 0,
          border: 'none',
          background: 'transparent',
        }}
      >
        <div
          className={styles.faqAnswerInner + ' ' + styles.faqAnswerInnerClosed}
        ></div>
      </div>
    </div>
  )
);

export default FaqItem;
