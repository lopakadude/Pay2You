import styles from './styles.module.css';
import SubsList from '../../components/SubsList';
import { useState } from 'react';
import InActiveCardInfo from '../../components/InActiveCardInfo';
import Modal from '../../components/Modal';
import { useAppSelector } from '../../hooks/redux';
import BackTo from '../../components/BackTo';

export default function InActiveSubsPage() {
  const [selectedInActiveCard, setSelectedInActiveCard] = useState(0);
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
      <BackTo />
      <h1 className={styles.inActiveSubsPage__header}>Неактивные подписки</h1>
      <SubsList
        type="flex"
        colorSсheme="none-active"
        data={defineContent()}
        setSelectedInActiveCard={setSelectedInActiveCard}
        attachment="my"
      />
      {isModalOpen && (
        <Modal content={<InActiveCardInfo cardId={selectedInActiveCard} />} />
      )}
    </section>
  );
}
