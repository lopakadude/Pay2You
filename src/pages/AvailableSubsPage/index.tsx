import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import SubsList from '../../components/SubsList';
import { useAppSelector } from '../../hooks/redux';
import { useGetCoversQuery } from '../../store/pay2u/pay2u.api';
import styles from './styles.module.css';
import { useActions } from '../../hooks/actions';

export default function AvailableSubsPage() {
  const [selectedCard, setSelectedCard] = useState(0);
  const { data: covers } = useGetCoversQuery();

  console.log(covers);
  const { setCovers } = useActions();

  useEffect(() => {
    setCovers(covers);
  });


  const currentCovers = useAppSelector((state) => state.covers.covers);

  return (
    <section className={styles.availableSubsPage}>
      <Navbar />
      <h1 className={styles.availableSubsPage__header}>Каталог</h1>
      <SubsList
        type="grid"
        data={currentCovers ? currentCovers : []}
        colorDescription="secondary"
        setSelectedCard={setSelectedCard}
      />
    </section>
  );
}
