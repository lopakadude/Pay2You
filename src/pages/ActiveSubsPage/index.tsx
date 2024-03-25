import styles from './styles.module.css';
import Navbar from '../../components/Navbar/index';
import { mySubsArray } from '../../utils/mockData';
import SubsList from '../../components/SubsList/index';
import { useState } from 'react';
import Modal from '../../components/Modal';
import ActiveCardInfo from '../../components/ActiveCardInfo';
import { useAppSelector } from '../../hooks/redux';
import Confirm from '../../components/Confirm';

export default function ActiveSubsPage() {
  const [selectedCard, setSelectedCard] = useState('');
  const isModalOpen = useAppSelector((state) => state.modal.isModalOpened);
  const isConfirmOpen = useAppSelector(
    (state) => state.confirm.isConfirmOpened
  );
  const defineContent = () => {
    return mySubsArray.filter((mySub) => mySub.is_active === true);
  };

  return (
    <section className={styles.activeSubsPage}>
      <Navbar />
      <h1 className={styles.activeSubsPage__header}>Активные подписки</h1>
      <SubsList
        type="flex"
        data={defineContent()}
        colorDescription="primary"
        setSelectedCard={setSelectedCard}
      />
      {isModalOpen && (
        <Modal
          content={
            !isConfirmOpen ? (
              <ActiveCardInfo cardId={selectedCard} />
            ) : (
              <Confirm cardId={selectedCard} />
            )
          }
        />
      )}
    </section>
  );
}
