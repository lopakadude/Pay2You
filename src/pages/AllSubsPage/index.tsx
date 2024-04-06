import Navbar from '../../components/Navbar';
import styles from './styles.module.css';
import ActionButton from '../../components/ActionButton/index';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/actions';
import { useEffect, useState } from 'react';
import {
  useLazyGetCoversQuery,
  useLazyGetUserQuery,
} from '../../store/pay2u/pay2u.api';
import { useAppSelector } from '../../hooks/redux';
import SubsList from '../../components/SubsList';
import Modal from '../../components/Modal';
import ActiveCardInfo from '../../components/ActiveCardInfo';
import InActiveCardInfo from '../../components/InActiveCardInfo';
import Confirm from '../../components/Confirm';
import OnBoardingPage from '../../components/Obnoarding/Onboarding';
import Popup from '../../components/Popup';
import ProlongationCancel from '../../components/ProlongationCancel';
import FailPage from '../FailPage';
import SuccessPage from '../SuccessPage';
import ProlongationActive from '../../components/ProlongationActive';
import Loader from '../../components/Loader';

export default function AllSubsPage() {
  const navigate = useNavigate();
  const [triggerUser, { data: user }] = useLazyGetUserQuery();
  const [triggerCovers] = useLazyGetCoversQuery();
  const { setCurrentUser, closeSuccessPage, closeFailPage, setCovers } =
    useActions();
  const activeSubs = user?.subscriptions.filter(
    (mySub) => mySub.is_active === true
  );
  const inActiveSubs = user?.subscriptions.filter(
    (mySub) => mySub.is_active === false
  );
  const isModalOpen = useAppSelector((state) => state.modal.isModalOpened);
  const isConfirmOpen = useAppSelector(
    (state) => state.confirm.isConfirmOpened
  );
  const newSub = useAppSelector((state) => state.newSub.newSub);
  const error = useAppSelector((state) => state.error.error);
  const prolongation = useAppSelector(
    (state) => state.prolongation.isProlongation
  );
  const isSuccesFormSubmitted = useAppSelector(
    (state) => state.successForm.isSuccessFormSubmitted
  );
  const isFailFormSubmitted = useAppSelector(
    (state) => state.failForm.isFailFormSubmitted
  );
  const currentCovers = useAppSelector((state) => state.covers.covers);
  const [selectedActiveCard, setSelectedActiveCard] = useState(0);
  const [selectedInActiveCard, setSelectedInActiveCard] = useState(0);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const isPopupOpened = useAppSelector((state) => state.popup.isPopupOpened);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    triggerUser()
      .unwrap()
      .then((user) => setCurrentUser(user))
      .finally(() => setIsLoading(false));
    setIsLoading(true);
    triggerCovers()
      .unwrap()
      .then((covers) => setCovers(covers.results))
      .finally(() => setIsLoading(false));
    if (isFailFormSubmitted) {
      closeFailPage();
    }
    if (isSuccesFormSubmitted) {
      closeSuccessPage();
    }
  }, []);

  return (
    <section className={styles.allSubsPage}>
      {!isOnboardingOpen &&
        user &&
        !isLoading &&
        !isFailFormSubmitted &&
        !isSuccesFormSubmitted && (
          <div className={styles.allSubsPage__container}>
            <Navbar />
            <div className={styles.allSubsPage__header}>
              <h1 className={styles.allSubsPage__title}>
                Предложения партнёров
              </h1>
              <button
                className={styles.allSubsPage__onBoardingButton}
                onClick={() => setIsOnboardingOpen(true)}
              >
                Что это?
              </button>
            </div>
            <ul className={styles.allSubsPage__balance}>
              <li className={styles.allSubsPage__balanceItem}>
                <p className={styles.allSubsPage__balanceDescription}>
                  Потрачено в марте
                </p>
                <span className={styles.allSubsPage__balanceValue}>
                  {' '}
                  {user.current_month_expenses || 0} &#8381;
                </span>
              </li>
              <li className={styles.allSubsPage__balanceItem}>
                <p className={styles.allSubsPage__balanceDescription}>
                  Начислен кешбэк за март
                </p>
                <span className={styles.allSubsPage__cashbackValue}>
                  {' '}
                  {user.cashback || 0} &#8381;
                </span>
              </li>
            </ul>
            <div className={styles.allSubsPage__subscriptionsLists}>
              {activeSubs && activeSubs.length !== 0 && (
                <div>
                  <h2 className={styles.allSubsPage__subTitle}>
                    Активные подписки{' '}
                    {activeSubs.length > 3 ? `: ${activeSubs.length}` : ''}
                  </h2>
                  <SubsList
                    data={activeSubs.slice(0, 3)}
                    type="flex"
                    setSelectedActiveCard={setSelectedActiveCard}
                    attachment="myActive"
                    colorDescription="primary"
                  />
                  {activeSubs.length > 3 && (
                    <div
                      className={styles.allSubsPage__buttonToSection}
                      onClick={() => navigate('/active-subs')}
                    >
                      <ActionButton title="Посмотреть все" />
                    </div>
                  )}
                </div>
              )}
              {inActiveSubs && inActiveSubs.length !== 0 && (
                <div>
                  <h2 className={styles.allSubsPage__subTitle}>
                    Неактивные подписки{' '}
                    {inActiveSubs.length > 3 ? `: ${inActiveSubs.length}` : ''}
                  </h2>
                  <SubsList
                    data={inActiveSubs.slice(0, 3)}
                    type="flex"
                    colorSсheme="none-active"
                    setSelectedInActiveCard={setSelectedInActiveCard}
                    attachment="myInActive"
                  />
                  {inActiveSubs.length > 3 && (
                    <div
                      className={styles.allSubsPage__buttonToSection}
                      onClick={() => navigate('/inactive-subs')}
                    >
                      <ActionButton title="Посмотреть все" />
                    </div>
                  )}
                </div>
              )}
              {currentCovers && currentCovers.length !== 0 && (
                <div>
                  <h2 className={styles.allSubsPage__subTitle}>Каталог</h2>
                  <SubsList
                    data={currentCovers.slice(0, 2)}
                    type="grid"
                    attachment="offer"
                    colorDescription="secondary"
                  />
                  {currentCovers.length > 2 && (
                    <div
                      className={styles.allSubsPage__buttonToSection}
                      onClick={() => navigate('/available-subs')}
                    >
                      <ActionButton title="Посмотреть все" />
                    </div>
                  )}
                </div>
              )}
            </div>
            {selectedActiveCard !== 0
              ? isModalOpen && (
                  <Modal
                    setSelectedActiveCard={setSelectedActiveCard}
                    content={
                      !isConfirmOpen ? (
                        <ActiveCardInfo cardId={selectedActiveCard} />
                      ) : (
                        <Confirm />
                      )
                    }
                  />
                )
              : null}
            {selectedInActiveCard !== 0
              ? isModalOpen && (
                  <Modal
                    setSelectedInActiveCard={setSelectedInActiveCard}
                    content={<InActiveCardInfo cardId={selectedInActiveCard} />}
                  />
                )
              : null}
            {isPopupOpened && !prolongation && (
              <Popup content={<ProlongationCancel />} />
            )}
            {isPopupOpened && prolongation && (
              <Popup content={<ProlongationActive />} />
            )}
          </div>
        )}
      {isLoading && <Loader />}
      {isOnboardingOpen && !isFailFormSubmitted && !isSuccesFormSubmitted && (
        <OnBoardingPage setIsOnboardingOpen={setIsOnboardingOpen} />
      )}
      {isSuccesFormSubmitted && <SuccessPage data={newSub} />}
      {isFailFormSubmitted && <FailPage data={error} />}
    </section>
  );
}
