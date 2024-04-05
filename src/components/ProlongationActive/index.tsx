import styles from './styles.module.css';
import check from '../../assets/check-broken.svg';
import ActionButton from '../ActionButton';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { formatDate } from '../../utils/formatDate';


export default function ProlongationФсешму() {
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
        Продление {card.name} возобновлено
      </h2>
      <p className={styles.prolongationCancel__description}>
        Следующее списание {formatDate(card.end_date, '2-digit', false)}
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
