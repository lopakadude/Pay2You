import { useAppSelector } from '../../hooks/redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../store';
import { useEffect } from 'react';
import { useActions } from '../../hooks/actions';
import { useLoginMutation } from '../../store/pay2u/pay2u.api';
import NotFoundPage from '../../pages/NotFoundPage';

const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );
    const { setLoggedIn } = useActions();
    const [login] = useLoginMutation();
    const number = '0123456789';

    const auth = async () => {
      try {
        const res = await login({ phone_number: number }).unwrap();
        if (res.auth_token) {
          localStorage.setItem('authToken', res.auth_token);
          setLoggedIn(true);
          <Navigate to="/" replace />;
        }
        console.log(res.auth_token);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      auth();
    },[]);

  return isLoggedIn ? <Outlet /> : <NotFoundPage />;
};

export default ProtectedRoute;
