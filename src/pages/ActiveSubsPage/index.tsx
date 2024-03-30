import styles from './styles.module.css';
import Navbar from '../../components/Navbar/index';
import SubsList from '../../components/SubsList/index';
import { useState } from 'react';
import Modal from '../../components/Modal';
import ActiveCardInfo from '../../components/ActiveCardInfo';
import { useAppSelector } from '../../hooks/redux';
import Confirm from '../../components/Confirm';
import Popup from '../../components/Popup';
import ProlongationCancel from '../../components/ProlongationCancel';

export default function ActiveSubsPage() {
  const [selectedActiveCard, setSelectedActiveCard] = useState(0);
  const isModalOpen = useAppSelector((state) => state.modal.isModalOpened);
  const isPopupOpened = useAppSelector((state) => state.popup.isPopupOpened);
  const isConfirmOpen = useAppSelector(
    (state) => state.confirm.isConfirmOpened
  );
  const user = useAppSelector((state) => state.user.currentUser);
  const defineContent = () => {
    if (user) {
      return user.subscriptions.filter((mySub) => mySub.is_active === true);
    } else {
      return [];
    }
  };

  return (
    <section className={styles.activeSubsPage}>
      <Navbar />
      <h1 className={styles.activeSubsPage__header}>Активные подписки</h1>
      <SubsList
        type="flex"
        data={defineContent()}
        colorDescription="primary"
        attachment="my"
        setSelectedActiveCard={setSelectedActiveCard}
      />
      {isModalOpen && (
        <Modal
          content={
            !isConfirmOpen ? (
              <ActiveCardInfo cardId={selectedActiveCard} />
            ) : (
              <Confirm />
            )
          }
        />
      )}
      {isPopupOpened && <Popup content={<ProlongationCancel />} />}
    </section>
  );
}
