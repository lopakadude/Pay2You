import { useAppSelector } from '../../hooks/redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from '../../store';

const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );

  return isLoggedIn ? <Outlet /> : <Navigate to='/login'/>;
};

export default ProtectedRoute;
