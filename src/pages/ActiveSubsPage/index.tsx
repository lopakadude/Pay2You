import styles from './styles.module.css';
import Navbar from '../../components/Navbar/index';
import ActionButton from '../../components/ActionButton';
import { activeSubsArray } from '../../utils/mockData';
import SubsList from '../../components/SubsList/index';

export default function ActiveSubsPage() {

  return (
    <section className={styles.activeSubsPage}>
      <Navbar />
      <h1 className={styles.activeSubsPage__header}>Активные подписки</h1>
      <ActionButton children='сортировать по дате списания' size='s' />
      <SubsList 
      type='flex'
      data={activeSubsArray}
      colorDescription='primary'/>
    </section>
  )
}