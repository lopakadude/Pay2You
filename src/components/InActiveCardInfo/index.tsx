import styles from './styles.module.css';
import sbp from '../../assets/sbp.svg';
import ActionButton from '../ActionButton';
import { useActions } from '../../hooks/actions';
import { useGetMyCardInfoQuery } from '../../store/pay2u/pay2u.api';
import { useAppSelector } from '../../hooks/redux';
import { formatDate } from '../../utils/formatDate';
import { useEffect } from 'react';

export default function InActiveCardInfo({ cardId }: { cardId: number }) {
  const { closeModal, setCurrentCard } = useActions();
  const { data: myCard } = useGetMyCardInfoQuery({ id: cardId });
  const user = useAppSelector((state) => state.user.currentUser);
  const card = useAppSelector((state) => state.currentCard.currentCard);
  console.log(card);

  function handleButtonClick() {
    closeModal();
  }

  useEffect(() => {
    setCurrentCard(myCard);
  });

  return (
    <section className={styles.inActiveCardInfo}>
      {card && (
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
                {myCard ? formatDate(myCard.end_date, '2-digit', false) : ''}
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
    </section>
  );
}
