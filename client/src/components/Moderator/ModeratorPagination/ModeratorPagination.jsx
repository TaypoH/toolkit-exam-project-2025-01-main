import React from 'react';
import styles from './ModeratorPagination.module.sass';

const ModeratorPagination = ({ totalPages, currentPage, setPage }) => (
  <div className={styles.pagination}>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        type='button'
        key={i + 1}
        onClick={() => setPage(i + 1)}
        disabled={currentPage === i + 1}
        aria-label={`Go to page ${i + 1}`}
      >
        {i + 1}
      </button>
    ))}
  </div>
);

export default ModeratorPagination;
