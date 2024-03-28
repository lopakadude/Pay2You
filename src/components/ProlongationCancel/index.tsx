import styles from './styles.module.css';
import check from '../../assets/check-broken.svg';
import ActionButton from '../ActionButton';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { formatDate } from '../../utils/formatDate';


export default function ProlongationCancel() {
  const { closePopup} = useActions();
  const card = useAppSelector((state) => state.currentCard.currentCard);

  function handleCloseNotificaton() {
    closePopup();
  }

  return (
    <div className={styles.prolongationCancel}>
      <img src={check} alt="чек" className={styles.prolongationCancel__logo} />
      <h2 className={styles.prolongationCancel__header}>
        {' '}
        Продление {card.name} отменено
      </h2>
      <p className={styles.prolongationCancel__description}>
        После {formatDate(card.end_date, '2-digit', false)}, мы сохраним
        подписку в разделе Неактивные подписки. Вы можете возобновить её в любой
        момент
      </p>
      <div
        className={styles.prolongationCancel__buttonContainer}
        onClick={() => handleCloseNotificaton()}
      >
        <ActionButton title="Понятно" size='m' />
      </div>
    </div>
  );
}
