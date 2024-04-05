import styles from './styles.module.css';
import SubsList from '../../components/SubsList/index';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import ActiveCardInfo from '../../components/ActiveCardInfo';
import { useAppSelector } from '../../hooks/redux';
import Confirm from '../../components/Confirm';
import Popup from '../../components/Popup';
import ProlongationCancel from '../../components/ProlongationCancel';
import { useLazyGetUserQuery } from '../../store/pay2u/pay2u.api';
import { useActions } from '../../hooks/actions';
import BackTo from '../../components/BackTo';

export default function ActiveSubsPage() {
  const [selectedActiveCard, setSelectedActiveCard] = useState(0);
  const isModalOpen = useAppSelector((state) => state.modal.isModalOpened);
  const isPopupOpened = useAppSelector((state) => state.popup.isPopupOpened);
  const isConfirmOpen = useAppSelector(
    (state) => state.confirm.isConfirmOpened
  );
    const { setCurrentUser } = useActions();
  
  const user = useAppSelector((state) => state.user.currentUser);
    const [triggerUser] = useLazyGetUserQuery();
  const defineContent = () => {
    if (user) {
      return user.subscriptions.filter((mySub) => mySub.is_active === true);
    } else {
      return [];
    }
  };

  useEffect(() => {
    triggerUser()
      .unwrap()
      .then((user) => setCurrentUser(user));
  }, []);

  console.log(user)

  return (
    <section className={styles.activeSubsPage}>
      <BackTo />
      <h1 className={styles.activeSubsPage__header}>Активные подписки</h1>
      <SubsList
        type="flex"
        data={defineContent()}
        colorDescription="primary"
        attachment="myActive"
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
