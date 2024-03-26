import styles from './styles.module.css';
import sbp from '../../assets/sbp.svg';
import ActionButton from '../ActionButton';
import { useActions } from '../../hooks/actions';
import { useGetMyCardInfoQuery } from '../../store/pay2u/pay2u.api';
import { useAppSelector } from '../../hooks/redux';
import { formatDate } from '../../utils/formatDate';

export default function ActiveCardInfo({ cardId }: { cardId: number }) {
  const { openConfirm } = useActions();
  const { data: myCard } = useGetMyCardInfoQuery({ id: cardId });
    const user = useAppSelector((state) => state.user.currentUser);
  console.log(myCard)

  return (
    <section className={styles.activeCardInfo}>
      <div className={styles.activeCardInfo__header}>
        <img
          src={`https://pay2u.ddns.net/${myCard?.logo_link}`}
          alt={myCard?.name}
          className={styles.activeCardInfo__logo}
        />
        <div className={styles.activeCardInfo__name}>
          <h3 className={styles.activeCardInfo__title}>{myCard?.name}</h3>
          <p className={styles.activeCardInfo__description}>
            {myCard?.description}
          </p>
        </div>
      </div>
      <ul className={styles.activeCardInfo__list}>
        <li className={styles.activeCardInfo__listItem}>
          <p className={styles.activeCardInfo__itemDescription}>
            Стоимость подписки
          </p>
          <p className={styles.activeCardInfo__itemValue}>
            {myCard?.monthly_price} &#x20bd;
          </p>
        </li>
        <li className={styles.activeCardInfo__listItem}>
          <p className={styles.activeCardInfo__itemDescription}>
            Следующее списание
          </p>
          <p className={styles.activeCardInfo__itemValue}>
            {myCard ? formatDate(myCard.end_date, '2-digit', false) : ''}
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
          <p className={styles.activeCardInfo__itemValue}>{myCard?.promo}</p>
        </li>
      </ul>
      <a
        href={myCard?.service_link}
        className={styles.activeCardInfo__siteLink}
      >
        Скопировать промокод и перейти на сайт
      </a>
      <p className={styles.activeCardInfo__prolongationValue}>
        Ежемесячное автопродление
      </p>
      <p className={styles.activeCardInfo__prolongationDescription}>
        Подписка активна в вашем аккаунте Иви с телефоном, как в банке
      </p>
      <div
        onClick={() => {
          openConfirm();
        }}
      >
        <ActionButton title="Отключить автопродление" />
      </div>
    </section>
  );
}
