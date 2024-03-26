import Navbar from '../../components/Navbar';
import styles from './styles.module.css';
import ActionButton from '../../components/ActionButton/index';
import { Navigate, useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/actions';
import { useEffect } from 'react';
import { useGetUserQuery, useLoginMutation } from '../../store/pay2u/pay2u.api';

export default function AllSubsPage() {
  const navigate = useNavigate();
  const { setLoggedIn, setCurrentUser } = useActions();
  const [login] = useLoginMutation();
  const number = '0123456789';

  const auth = async () => {
    try {
      const res = await login({ phone_number: number }).unwrap();
      if (res.token) {
        localStorage.setItem('authToken', res.token);
        setLoggedIn(true);
        <Navigate to="/" replace />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data: user } = useGetUserQuery();

  useEffect(() => {
    auth();
  }, []);

  useEffect(() => {
    setCurrentUser(user);
    console.log(user)
  });

  return (
    <section className={styles.allSubsPage}>
      <Navbar />
      <h1 className={styles.allSubsPage__header}>Подписки партнёров</h1>
      <div onClick={() => navigate('/active-subs')}>
        <ActionButton title="активные подписки" />
      </div>
      <div onClick={() => navigate('/inactive-subs')}>
        <ActionButton title="неактивные подписки" />
      </div>
      <div onClick={() => navigate('/available-subs')}>
        <ActionButton title="доступные подписки" />
      </div>
    </section>
  );
}
