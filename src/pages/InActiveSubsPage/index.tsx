import Navbar from '../../components/Navbar';
import styles from './styles.module.css';
import { mySubsArray } from '../../utils/mockData';
import SubsList from '../../components/SubsList';
import { useState } from 'react';
import ActiveCardInfo from '../../components/ActiveCardInfo';
import Modal from '../../components/Modal';
import { useAppSelector } from '../../hooks/redux';

export default function InActiveSubsPage() {
    const [selectedCard, setSelectedCard] = useState('');
  const defineContent = () => {
    return mySubsArray.filter((mySub) => mySub.is_active === false);
  };

    const isModalOpen = useAppSelector((state) => state.modal.isModalOpened);

  return (
    <section className={styles.inActiveSubsPage}>
      <Navbar />
      <h1 className={styles.inActiveSubsPage__header}>Неактивные подписки</h1>
      <SubsList
        type="flex"
        colorSсheme="none-active"
        data={defineContent()}
        setSelectedCard={setSelectedCard}
      />
      {isModalOpen && (
        <Modal content={<ActiveCardInfo cardId={selectedCard} />} />
      )}
    </section>
  );
}
