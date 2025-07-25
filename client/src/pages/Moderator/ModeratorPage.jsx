import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './ModeratorPage.module.sass';
import CONSTANTS from '../../constants';
import {
  getModeratorOffers,
  approveOffer,
  rejectOffer,
} from '../../api/rest/restController';
import ModeratorHeader from '../../components/Moderator/ModeratorHeader/ModeratorHeader';
import OfferCard from '../../components/Moderator/OfferCard/OfferCard';
import ModeratorPagination from '../../components/Moderator/ModeratorPagination/ModeratorPagination';
import ErrorMessage from '../../components/Moderator/ErrorMessage/ErrorMessage';

const MODERATOR_ROLE = CONSTANTS.MODERATOR || 'moderator';
const pageSize = 20;

const ModeratorPage = () => {
  const [offers, setOffers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { role } = useSelector(({ userStore }) => userStore.data || {});
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || role !== MODERATOR_ROLE) {
      navigate('/', { replace: true });
    }
  }, [role, navigate]);

  const fetchOffers = useCallback(async pageNum => {
    setLoading(true);
    setError('');
    try {
      const { data: { offers = [], total = 0 } = {} } =
        await getModeratorOffers({
          limit: pageSize,
          offset: (pageNum - 1) * pageSize,
        });
      setOffers(offers);
      setTotal(total);
    } catch {
      setOffers([]);
      setTotal(0);
      setError('Failed to load offers. Please try again.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOffers(page);
  }, [page, fetchOffers]);

  const handleModerate = useCallback(
    async (offerId, action) => {
      setError('');
      try {
        if (action === 'approve') {
          await approveOffer(offerId);
        } else if (action === 'reject') {
          await rejectOffer(offerId);
        }
        await fetchOffers(page);
      } catch {
        setError('Failed to update offer status. Please try again.');
      }
    },
    [page, fetchOffers]
  );

  const handleImageError = e => {
    e.target.onerror = null;
    e.target.src = CONSTANTS.ANONYM_IMAGE_PATH;
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className={styles.moderatorPage}>
      <ModeratorHeader onRefresh={() => fetchOffers(page)} />
      {error && <ErrorMessage message={error} />}
      {loading ? (
        <div className={styles.emptyListMsg}>Loading...</div>
      ) : offers.length === 0 ? (
        <div className={styles.emptyListMsg}>No offers found</div>
      ) : (
        <div className={styles.cardsContainer}>
          {offers.map(offer => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onModerate={handleModerate}
              handleImageError={handleImageError}
            />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <ModeratorPagination
          totalPages={totalPages}
          currentPage={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default ModeratorPage;
