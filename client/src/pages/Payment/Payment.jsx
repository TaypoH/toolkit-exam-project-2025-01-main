import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { pay, clearPaymentStore } from '../../store/slices/paymentSlice';
import PayForm from '../../components/PayForm/PayForm';
import styles from './Payment.module.sass';
import Error from '../../components/Error/Error';

const Payment = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contests } = props.contestCreationStore;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isEmpty(contests)) {
      navigate('/startContest', { replace: true });
    }
  }, [contests, navigate]);

  const pay = values => {
    const contestsArray = Object.values(contests).map(contest => ({ ...contest }));
    const file = location.state && location.state.file;
    const { number, expiry, cvc } = values;
    const data = new FormData();

    if (file) {
      data.append('files', file);
      contestsArray.forEach(contest => {
        contest.haveFile = true;
      });
    } else {
      contestsArray.forEach(contest => {
        contest.haveFile = false;
      });
    }
    data.append('number', number);
    data.append('expiry', expiry);
    data.append('cvc', cvc);
    data.append('contests', JSON.stringify(contestsArray));
    data.append('price', '100');
    props.pay({
      data: {
        formData: data,
      },
      navigate,
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  const { error } = props.payment;
  const { clearPaymentStore } = props;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.paymentContainer}>
        <span className={styles.headerLabel}>Checkout</span>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={clearPaymentStore}
          />
        )}
        <PayForm sendRequest={pay} back={goBack} isPayForOrder />
      </div>
      <div className={styles.orderInfoContainer}>
        <span className={styles.orderHeader}>Order Summary</span>
        <div className={styles.packageInfoContainer}>
          <span className={styles.packageName}>Package Name: Standard</span>
          <span className={styles.packagePrice}>$100 USD</span>
        </div>
        <div className={styles.resultPriceContainer}>
          <span>Total:</span>
          <span>$100.00 USD</span>
        </div>
        <a href='http://www.google.com'>Have a promo code?</a>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  payment: state.payment,
  contestCreationStore: state.contestCreationStore,
});

const mapDispatchToProps = dispatch => ({
  pay: ({ data, navigate }) => dispatch(pay({ data, navigate })),
  clearPaymentStore: () => dispatch(clearPaymentStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
