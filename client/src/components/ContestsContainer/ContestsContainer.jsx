import React, { useEffect } from 'react';
import styles from './ContestContainer.module.sass';
import Spinner from '../Spinner/Spinner';

const ContestsContainer = props => {
  const scrollHandler = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      if (props.haveMore && !props.isFetching) {
        props.loadMore(props.children.length);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [props.haveMore, props.isFetching, props.children.length, props.loadMore]);

  const { isFetching } = props;
  if (!isFetching && props.children.length === 0) {
    return <div className={styles.notFound}>Nothing not found</div>;
  }

  return (
    <div>
      {props.children}
      {isFetching && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ContestsContainer;
