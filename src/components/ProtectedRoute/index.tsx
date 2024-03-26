import { useAppSelector } from '../../hooks/redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '../../store';
import { useEffect } from 'react';
import { useActions } from '../../hooks/actions';
import { useGetUserQuery} from '../../store/pay2u/pay2u.api';
import NotFoundPage from '../../pages/NotFoundPage';

const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );
    const { setCurrentUser } = useActions();
    const { data: user } = useGetUserQuery();

    useEffect(() => {
      setCurrentUser(user);
      console.log(user);
    });

  return isLoggedIn ? <Outlet /> : <NotFoundPage />;
};

export default ProtectedRoute;
