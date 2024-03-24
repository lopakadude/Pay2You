import Navbar from '../../components/Navbar';
import styles from './styles.module.css';
import ActionButton from '../../components/ActionButton/index';
import { useNavigate } from 'react-router-dom';

export default function AllSubsPage() {

  const navigate = useNavigate();

  return (
    <section className={styles.allSubsPage}>
      <Navbar />
      <h1 className={styles.allSubsPage__header}>Подписки партнёров</h1>
      <div onClick={() => navigate('/active-subs')}>
        <ActionButton children="активные подписки" />
      </div>
      <div onClick={() => navigate('/inactive-subs')}>
        <ActionButton children="неактивные подписки" />
      </div>
      <div onClick={() => navigate('/available-subs')}>
        <ActionButton children="доступные подписки" />
      </div>
    </section>
  );
}