import Navbar from '../../components/Navbar';
import SubsList from '../../components/SubsList';
import { activeSubsArray } from '../../utils/mockData';
import styles from './styles.module.css';

export default function AvailableSubsPage() {
  return (
    <section className={styles.availableSubsPage}>
      <Navbar />
      <h1 className={styles.availableSubsPage__header}>
        Доступные предложения
      </h1>
      <SubsList
        type="grid"
        data={activeSubsArray}
        colorDescription="secondary"
      />
    </section>
  );
}
