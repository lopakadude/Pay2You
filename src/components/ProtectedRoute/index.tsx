import { useAppSelector } from '../../hooks/redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '../../store';
import NotFoundPage from '../../pages/NotFoundPage';

const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );

  return isLoggedIn ? <Outlet /> : <NotFoundPage />;
};

export default ProtectedRoute;
