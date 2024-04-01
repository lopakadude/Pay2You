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
import arrowRight from '../../assets/chevron-right.svg';
import { useAppSelector } from '../../hooks/redux';
import SubsList from '../../components/SubsList';
import Modal from '../../components/Modal';
import ActiveCardInfo from '../../components/ActiveCardInfo';
import InActiveCardInfo from '../../components/InActiveCardInfo';
import Confirm from '../../components/Confirm';
import OnBoardingPage from '../../components/Obnoarding/Onboarding';
import Popup from '../../components/Popup';
import ProlongationCancel from '../../components/ProlongationCancel';

export default function AllSubsPage() {
  const navigate = useNavigate();
  const [triggerUser, { data: user }] = useLazyGetUserQuery();
  const [triggerCovers] = useLazyGetCoversQuery();
  const { setCurrentUser } = useActions();
  const { setCovers } = useActions();
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
  const currentCovers = useAppSelector((state) => state.covers.covers);
  const [selectedActiveCard, setSelectedActiveCard] = useState(0);
  const [selectedInActiveCard, setSelectedInActiveCard] = useState(0);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const isPopupOpened = useAppSelector((state) => state.popup.isPopupOpened);

  useEffect(() => {
    triggerUser()
      .unwrap()
      .then((user) => setCurrentUser(user));
    triggerCovers()
      .unwrap()
      .then((covers) => setCovers(covers.results));
  }, []);

  console.log(user);

  return (
    <section className={styles.allSubsPage}>
      {!isOnboardingOpen && user ? (
        <div>
          <Navbar />
          <div className={styles.allSubsPage__header}>
            <h1 className={styles.allSubsPage__title}>Предложения партнёров</h1>
            <button
              className={styles.allSubsPage__onBoardingButton}
              onClick={() => setIsOnboardingOpen(true)}
            >
              Что это?
            </button>
          </div>
          <ul className={styles.allSubsPage__balance}>
            <li className={styles.allSubsPage__balanceDescription}>
              Потрачено в марте
              <span className={styles.allSubsPage__balanceValue}>
                {' '}
                {user.current_month_expenses || 0} &#8381;
              </span>
            </li>
            <li className={styles.allSubsPage__balanceDescription}>
              Начислен кешбэк за март
              <span className={styles.allSubsPage__cashbackValue}>
                {' '}
                {user.cashback || 0} &#8381;
              </span>
            </li>
            <button className={styles.allSubsPage__balanceLink}>
              <img src={arrowRight} alt="перейти" />
            </button>
          </ul>
          <div className={styles.allSubsPage__subscriptionsLists}>
            {activeSubs && activeSubs.length !== 0 && (
              <div>
                <h2 className={styles.allSubsPage__subTitle}>
                  Активные подписки: {activeSubs.length}
                </h2>
                <SubsList
                  data={activeSubs.slice(0, 3)}
                  type="flex"
                  setSelectedActiveCard={setSelectedActiveCard}
                  attachment="myActive"
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
                  Неактивные подписки: {inActiveSubs.length}
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
          {isPopupOpened && <Popup content={<ProlongationCancel />} />}
        </div>
      ) : (
        <OnBoardingPage setIsOnboardingOpen={setIsOnboardingOpen} />
      )}
    </section>
  );
}
