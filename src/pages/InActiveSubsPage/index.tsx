import Navbar from '../../components/Navbar';
import styles from './styles.module.css';
import { activeSubsArray } from '../../utils/mockData';
import SubsList from '../../components/SubsList';

export default function InActiveSubsPage() {

  return (
    <section className={styles.inActiveSubsPage}>
      <Navbar />
      <h1 className={styles.inActiveSubsPage__header}>Неактивные подписки</h1>
      <SubsList type="flex" colorSсheme="none-active" data={activeSubsArray}  />
    </section>
  );
}
