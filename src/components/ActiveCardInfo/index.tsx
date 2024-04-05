import styles from './styles.module.css';
import sbp from '../../assets/sbp.svg';
import ActionButton from '../ActionButton';
import { useActions } from '../../hooks/actions';
import {
  useLazyGetMyCardInfoQuery,
  usePatchAutorenewalTrueCardMutation,
} from '../../store/pay2u/pay2u.api';
import { useAppSelector } from '../../hooks/redux';
import { formatDate } from '../../utils/formatDate';
import { useEffect } from 'react';

export default function ActiveCardInfo({ cardId }: { cardId: number }) {
  const { openConfirm, setCurrentCard, closeModal, openPopup, prolongationActive } = useActions();
  const [triggerCard] = useLazyGetMyCardInfoQuery();
  const user = useAppSelector((state) => state.user.currentUser);
  const card = useAppSelector((state) => state.currentCard.currentCard);
    const [patchRenewalTrueCard] = usePatchAutorenewalTrueCardMutation();
  function copyText(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => console.log('ok'))
      .catch(() => console.log('not ok'));
  }

  useEffect(() => {
    triggerCard(cardId)
      .unwrap()
      .then((card) => setCurrentCard(card));
  }, []);

  console.log(card);

  const  submitClick = async () => {
    if (card.autorenewal) {
      openConfirm();
    } else {
            await patchRenewalTrueCard(card.id)
              .unwrap()
              .then(() => {
                closeModal();
                prolongationActive();
                openPopup();
              })
              .catch(() => {
                closeModal();
                openPopup();
              });
    }
  }

  return (
    <section className={styles.activeCardInfo}>
      {card && (
        <div>
          <div className={styles.activeCardInfo__header}>
            <img
              src={`https://pay2u.ddns.net/${card.logo_link}`}
              alt={card.name}
              className={styles.activeCardInfo__logo}
            />
            <div className={styles.activeCardInfo__name}>
              <h3 className={styles.activeCardInfo__title}>
                {card.cover_name}
              </h3>
              <p className={styles.activeCardInfo__description}>
                Подписка {card.name}
              </p>
            </div>
          </div>
          <ul className={styles.activeCardInfo__list}>
            <li className={styles.activeCardInfo__listItem}>
              <p className={styles.activeCardInfo__itemDescription}>
                Стоимость подписки
              </p>
              <p className={styles.activeCardInfo__itemValue}>
                {Math.trunc(card.monthly_price)} &#x20bd;
              </p>
            </li>
            <li className={styles.activeCardInfo__listItem}>
              <p className={styles.activeCardInfo__itemDescription}>
                {card.autorenewal
                  ? 'Следующее списание'
                  : 'Подписка активна до'}
              </p>
              <p className={styles.activeCardInfo__itemValue}>
                {formatDate(card.end_date, '2-digit', false)}
              </p>
            </li>
            <li className={styles.activeCardInfo__listItem}>
              <p className={styles.activeCardInfo__itemDescription}>
                Способ оплаты
              </p>
              <img src={sbp} alt="спб" />
            </li>
            <li className={styles.activeCardInfo__listItem}>
              <p className={styles.activeCardInfo__itemDescription}>
                Номер телефона
              </p>
              <p className={styles.activeCardInfo__itemValue}>
                {user.phone_number}
              </p>
            </li>
            <li className={styles.activeCardInfo__listItem}>
              <p className={styles.activeCardInfo__itemDescription}>Промокод</p>
              <p className={styles.activeCardInfo__itemValue}>
                {card.promocode}
              </p>
            </li>
          </ul>
          <a
            href={card.service_link}
            target="_blank"
            onClick={() => {
              copyText(card.promocode);
            }}
            className={styles.activeCardInfo__siteLink}
          >
            Скопировать промокод и перейти на сайт
          </a>
          {!card.autorenewal && (
            <p
              className={`${styles.activeCardInfo__prolongationValue} ${styles.activeCardInfo__prolongationValue_false}`}
            >
              Автопродление отключено
            </p>
          )}
          {card.autorenewal && (
            <p className={styles.activeCardInfo__prolongationValue}>
              Ежемесячное автопродление
            </p>
          )}
          <p className={styles.activeCardInfo__prolongationDescription}>
            Подписка активна в вашем аккаунте Иви с телефоном, как в банке
          </p>
          <div
            onClick={() => {
              submitClick();
            }}
          >
            <ActionButton
              title={
                card.autorenewal
                  ? 'Отключить автопродление'
                  : 'Возобновить автопродление'
              }
            />
          </div>
        </div>
      )}
    </section>
  );
}
