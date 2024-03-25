import { useState } from 'react';
import Navbar from '../../components/Navbar';
import SubsList from '../../components/SubsList';
import { availableSubsArray } from '../../utils/mockData';
import styles from './styles.module.css';
import { useAppSelector } from '../../hooks/redux';
import ActiveCardInfo from '../../components/ActiveCardInfo';
import Modal from '../../components/Modal';

export default function AvailableSubsPage() {
    const [selectedCard, setSelectedCard] = useState('');
      const isModalOpen = useAppSelector((state) => state.modal.isModalOpened);
  return (
    <section className={styles.availableSubsPage}>
      <Navbar />
      <h1 className={styles.availableSubsPage__header}>Каталог</h1>
      <SubsList
        type="grid"
        data={availableSubsArray}
        colorDescription="secondary"
        setSelectedCard={setSelectedCard}
      />
      {isModalOpen && (
        <Modal content={<ActiveCardInfo cardId={selectedCard} />} />
      )}
    </section>
  );
}
