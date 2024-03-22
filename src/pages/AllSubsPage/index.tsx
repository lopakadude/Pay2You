import Navbar from '../../components/Navbar';
import styles from './styles.module.css';

export default function AllSubsPage() {

  return (
    <section className={styles.allSubsPage}>
      <Navbar />
      <h1 className={styles.allSubsPage__header}>Подписки партнёров</h1>
    </section>
  )
}