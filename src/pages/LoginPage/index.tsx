import { useAppSelector } from '../../hooks/redux';
import styles from './styles.module.css';
import { RootState } from '../../store';
import { useActions } from '../../hooks/actions';
import { useLoginMutation } from '../../store/pay2u/pay2u.api';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function NotFoundPage() {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
    const number = '9111234567';
      const { setLoggedIn } = useActions();
      const [login] = useLoginMutation();
      const navigate = useNavigate(); 

  const auth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        const res = await login({ phone_number: number }).unwrap();
        if (res.token) {
          localStorage.setItem('authToken', res.token);
          setLoggedIn(true);
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
    auth();
    }
  }, []);

  return (
    <section className={styles.notFound}>
      <p>Авторизация</p>
    </section>
  );
}
