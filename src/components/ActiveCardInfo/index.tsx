import styles from './styles.module.css';
import { mySubsArray, user } from '../../utils/mockData';
import sbp from '../../assets/sbp.svg';
import ActionButton from '../ActionButton';
import { useActions } from '../../hooks/actions';

export default function ActiveCardInfo({ cardId }: { cardId: string }) {
  const { openConfirm } = useActions();
  const card = mySubsArray.find((mySub) => mySub.id === cardId);
  console.log(card);

  // function copyText(text: string) {
  //   navigator.clipboard
  //     .writeText(text)
  //     .then(() => console.log('ok'))
  //     .catch(() => console.log('not ok'));
  // }

  return (
    <section className={styles.activeCardInfo}>
      <div className={styles.activeCardInfo__header}>
        <img
          src={card?.logo}
          alt={card?.name}
          className={styles.activeCardInfo__logo}
        />
        <div className={styles.activeCardInfo__name}>
          <h3 className={styles.activeCardInfo__title}>{card?.name}</h3>
          <p className={styles.activeCardInfo__description}>
            {card?.description}
          </p>
        </div>
      </div>
      <ul className={styles.activeCardInfo__list}>
        <li className={styles.activeCardInfo__listItem}>
          <p className={styles.activeCardInfo__itemDescription}>
            Стоимость подписки
          </p>
          <p className={styles.activeCardInfo__itemValue}>
            {card?.cost} &#x20bd;
          </p>
        </li>
        <li className={styles.activeCardInfo__listItem}>
          <p className={styles.activeCardInfo__itemDescription}>
            Следующее списание
          </p>
          <p className={styles.activeCardInfo__itemValue}>{card?.date}</p>
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
          <p className={styles.activeCardInfo__itemValue}>{card?.promo}</p>
        </li>
      </ul>
      <a
        href={card?.service_link}
        // onClick={() => {
        //   copyText(card.promo);
        // }}
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
