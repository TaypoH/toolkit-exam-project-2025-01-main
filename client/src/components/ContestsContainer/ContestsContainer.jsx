import React from 'react';
import styles from './ContestContainer.module.sass';
import Spinner from '../Spinner/Spinner';

class ContestsContainer extends React.Component {
  componentDidMount () {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      if (this.props.haveMore && !this.props.isFetching) {
        this.props.loadMore(this.props.children.length);
      }
    }
  };

  render () {
    const { isFetching } = this.props;
    if (!isFetching && this.props.children.length === 0) {
      return <div className={styles.notFound}>Nothing not found</div>;
    }
    return (
      <div>
        {this.props.children}
        {isFetching && (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        )}
      </div>
    );
  }
}

export default ContestsContainer;
