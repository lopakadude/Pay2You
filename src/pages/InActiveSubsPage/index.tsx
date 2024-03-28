import Navbar from '../../components/Navbar';
import styles from './styles.module.css';
import SubsList from '../../components/SubsList';
import { useState } from 'react';
import InActiveCardInfo from '../../components/InActiveCardInfo';
import Modal from '../../components/Modal';
import { useAppSelector } from '../../hooks/redux';

export default function InActiveSubsPage() {
  const [selectedCard, setSelectedCard] = useState(0);
    const user = useAppSelector((state) => state.user.currentUser);
  const defineContent = () => {
    if (user) {
      return user.subscriptions.filter((mySub) => mySub.is_active === false);
    } else {
      return [];
    }
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
        <Modal content={<InActiveCardInfo cardId={selectedCard} />} />
      )}
    </section>
  );
}
