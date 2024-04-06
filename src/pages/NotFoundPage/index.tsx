import styles from './styles.module.css';
import smile from '../../assets/smiley-sad.svg';
import ActionButton from '../../components/ActionButton';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  
    const navigate = useNavigate();
  return (
    <section className={styles.notFound}>
      <div className={styles.notFound__main}>
        <img src={smile} alt="смайл" className={styles.notFound__smile} />
        <h1 className={styles.notFound__title}>Ошибка 404</h1>
        <p className={styles.notFound__description}>
          Страницы, которую вы запросили, не существует. Возможно она устарела
          или была удалена
        </p>
      </div>
      <div
        className={styles.notFound__buttonToPartner}
        onClick={() => navigate('/all-subs', { replace: true })}
      >
        <ActionButton title="Перейти к Предложениям партнёров" />
      </div>
    </section>
  );
}
