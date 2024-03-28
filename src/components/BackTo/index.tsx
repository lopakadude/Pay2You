import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import ArrowLeft from '../icons/ArrowLeft/Arrowleft';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  function defineAction () {
    if (location.pathname === '/active-subs' || location.pathname === '/inactive-subs' || location.pathname === '/available-subs' || location.pathname === '/wastes') {
      navigate('/all-subs', { replace: true });
    }
    if (location.pathname === '/active-subs') {
      navigate('/', { replace: true });
    }
  }

  function defineContent() {
    if (location.pathname === '/active-subs' || location.pathname === '/inactive-subs' || location.pathname === '/available-subs' || location.pathname === '/wastes') {
      return 'Предложения партнёров';
    }
    if (location.pathname === '/all-subs') {
      return "Раздел банковского приложения"
    }
  }

  return (
    <div className={styles.backTo}>
      <button className={styles.backTo__button}
      onClick={defineAction}>
    <ArrowLeft/>
    <h2 className={styles.backTo__header}>{defineContent()}</h2>
      </button>
    </div>
  )
}