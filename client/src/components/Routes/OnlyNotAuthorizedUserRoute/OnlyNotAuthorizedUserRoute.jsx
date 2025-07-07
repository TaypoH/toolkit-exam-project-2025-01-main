import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { getUser, clearUserStore } from '../../../store/slices/userSlice';
import { clearContestsList } from '../../../store/slices/contestsSlice';
import { resetChat } from '../../../store/slices/chatSlice';
import Spinner from '../../Spinner/Spinner';
import CONSTANTS from '../../../constants';

const OnlyNotAuthorizedUserRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isFetching } = useSelector(state => state.userStore);

  useEffect(() => {
    const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    if (token) {
      dispatch(getUser())
        .unwrap()
        .then(() => {
          navigate('/', { replace: true });
        })
        .catch(() => {
          localStorage.clear();
          dispatch(clearUserStore());
          dispatch(clearContestsList());
          dispatch(resetChat());
        });
    } else {
      dispatch(clearUserStore());
      dispatch(clearContestsList());
      dispatch(resetChat());
    }
  }, [dispatch, navigate]);

  if (isFetching) {
    return <Spinner />;
  }

  return data ? null : <Outlet />;
};

export default OnlyNotAuthorizedUserRoute;
