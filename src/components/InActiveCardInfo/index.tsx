import styles from './styles.module.css';
import sbp from '../../assets/sbp.svg';
import ActionButton from '../ActionButton';
import { useActions } from '../../hooks/actions';
import { useLazyGetMyCardInfoQuery } from '../../store/pay2u/pay2u.api';
import { useAppSelector } from '../../hooks/redux';
import { formatDate } from '../../utils/formatDate';
import { useEffect, useState } from 'react';
import SubscriptionForm from '../SubscriptionForm';

export default function InActiveCardInfo({ cardId }: { cardId: number }) {
  const { setCurrentCard } = useActions();
  const [triggerCard] = useLazyGetMyCardInfoQuery();
  const [isResumePaymentOpen, setIsResumePaymentOpen] = useState(false);
  const user = useAppSelector((state) => state.user.currentUser);
  const card = useAppSelector((state) => state.currentCard.currentCard);


  function handleButtonClick() {
    setIsResumePaymentOpen(true);
  }

  useEffect(() => {
    triggerCard(cardId)
      .unwrap()
      .then((card) => setCurrentCard(card));
  }, []);

  return (
    <section className={styles.inActiveCardInfo}>
      {card &&
        !isResumePaymentOpen && (
          <div>
            <div className={styles.inActiveCardInfo__header}>
              <img
                src={`https://pay2u.ddns.net/${card.logo_link}`}
                alt={card.name}
                className={styles.inActiveCardInfo__logo}
              />
              <h3 className={styles.inActiveCardInfo__title}>{card.name}</h3>
            </div>
            <ul className={styles.inActiveCardInfo__list}>
              <li className={styles.inActiveCardInfo__listItem}>
                <p className={styles.inActiveCardInfo__itemDescription}>
                  Подписка {card.name}
                </p>
                <p className={styles.inActiveCardInfo__itemValue}>
                  {user.phone_number}
                </p>
              </li>
              <li className={styles.inActiveCardInfo__listItem}>
                <p className={styles.inActiveCardInfo__itemDescription}>
                  Срок действия истёк
                </p>
                <p className={styles.inActiveCardInfo__itemValue}>
                  {formatDate(card.end_date, '2-digit', false)}
                </p>
              </li>
              <li className={styles.inActiveCardInfo__listItem}>
                <p className={styles.inActiveCardInfo__itemDescription}>
                  Стоимость
                </p>
                <p className={styles.inActiveCardInfo__itemValue}>
                  {card.monthly_price} &#x20bd;
                </p>
              </li>
              <li className={styles.inActiveCardInfo__listItem}>
                <p className={styles.inActiveCardInfo__itemDescription}>
                  Счет списания
                </p>
                <img src={sbp} alt="спб" />
              </li>
            </ul>
            <div
              onClick={() => {
                handleButtonClick();
              }}
            >
              <ActionButton title="Возобновить подписку" />
            </div>
          </div>
        )}
      {isResumePaymentOpen && <SubscriptionForm card={card} />}
    </section>
  );
}
