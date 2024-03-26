import styles from './styles.module.css';
import Navbar from '../../components/Navbar/index';
import SubsList from '../../components/SubsList/index';
import { useState } from 'react';
import Modal from '../../components/Modal';
import ActiveCardInfo from '../../components/ActiveCardInfo';
import { useAppSelector } from '../../hooks/redux';
import Confirm from '../../components/Confirm';
import { useGetUserQuery } from '../../store/pay2u/pay2u.api';

export default function ActiveSubsPage() {
  const [selectedCard, setSelectedCard] = useState(0);
  const isModalOpen = useAppSelector((state) => state.modal.isModalOpened);
  const isConfirmOpen = useAppSelector(
    (state) => state.confirm.isConfirmOpened
  );
  const { data: user } = useGetUserQuery();
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
        setSelectedCard={setSelectedCard}
      />
      {isModalOpen && (
        <Modal
          content={
            !isConfirmOpen ? (
              <ActiveCardInfo cardId={selectedCard} />
            ) : (
              <Confirm  />
            )
          }
        />
      )}
    </section>
  );
}
