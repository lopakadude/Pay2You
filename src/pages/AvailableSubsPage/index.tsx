import Navbar from '../../components/Navbar';
import styles from './styles.module.css';

export default function AvailableSubsPage() {

  return (
    <section className={styles.availableSubsPage}>
      <Navbar />
      <h1 className={styles.availableSubsPage__header}>Подписки партнёров</h1>
    </section>
  )
}