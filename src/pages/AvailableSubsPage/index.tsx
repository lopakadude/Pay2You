import Navbar from '../../components/Navbar';
import SubsList from '../../components/SubsList';
import { useAppSelector } from '../../hooks/redux';
import styles from './styles.module.css';

export default function AvailableSubsPage() {

  const currentCovers = useAppSelector((state) => state.covers.covers);

  return (
    <section className={styles.availableSubsPage}>
      <Navbar />
      <h1 className={styles.availableSubsPage__header}>Каталог</h1>
      <SubsList
        type="grid"
        data={currentCovers ? currentCovers : []}
        colorDescription="secondary"
        attachment="offer"
      />
    </section>
  );
}
