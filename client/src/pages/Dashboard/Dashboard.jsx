import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const params = useParams();

  const { role } = useSelector(state => state.userStore.data);

  useEffect(() => {
    if (role === 'moderator') {
      navigate('/', { replace: true });
    }
  }, [role, navigate]);

  if (role === 'moderator') return null;

  return role === CONSTANTS.CUSTOMER ? (
    <CustomerDashboard navigate={navigate} params={params} />
  ) : (
    <CreatorDashboard navigate={navigate} params={params} />
  );
};

export default Dashboard;
