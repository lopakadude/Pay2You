import styles from './styles.module.css';
import Navbar from '../../components/Navbar';

export default function WastesPage() {

  return (
    <section className={styles.wastesPage}>
      <Navbar />
      <h1 className={styles.wastesPage__header}>Траты и кешбэк за 
        <p className={styles.wastesPage__headerMonth}>{new Date().toLocaleString('default', { month: 'long' })}</p></h1>
    </section>
  )
}
