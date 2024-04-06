import styles from './styles.module.css';
import SubsList from '../../components/SubsList';
import { useEffect, useState } from 'react';
import InActiveCardInfo from '../../components/InActiveCardInfo';
import Modal from '../../components/Modal';
import { useAppSelector } from '../../hooks/redux';
import BackTo from '../../components/BackTo';
import Loader from '../../components/Loader';
import { useActions } from '../../hooks/actions';
import { useLazyGetUserQuery } from '../../store/pay2u/pay2u.api';

export default function InActiveSubsPage() {
  const [selectedInActiveCard, setSelectedInActiveCard] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useAppSelector((state) => state.user.currentUser);
  const [triggerUser] = useLazyGetUserQuery();
  const { setCurrentUser } = useActions();
  const defineContent = () => {
    if (user) {
      return user.subscriptions.filter((mySub) => mySub.is_active === false);
    } else {
      return [];
    }
  };

  const isModalOpen = useAppSelector((state) => state.modal.isModalOpened);

  useEffect(() => {
    setIsLoading(true);
    triggerUser()
      .unwrap()
      .then((user) => setCurrentUser(user))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className={styles.inActiveSubsPage}>
      <BackTo />
      <h1 className={styles.inActiveSubsPage__header}>Неактивные подписки</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <SubsList
          type="flex"
          colorSсheme="none-active"
          data={defineContent()}
          setSelectedInActiveCard={setSelectedInActiveCard}
          attachment="myInActive"
        />
      )}

      {isModalOpen && (
        <Modal content={<InActiveCardInfo cardId={selectedInActiveCard} />} />
      )}
    </section>
  );
}
