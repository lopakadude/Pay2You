import Navbar from '../../components/Navbar';
import styles from './styles.module.css';

export default function InActiveSubsPage() {

  return (
    <section className={styles.inActiveSubsPage}>
      <Navbar />
      <h1 className={styles.inActiveSubsPage__header}>Неактивные подписки</h1>
    </section>
  )
}
