import styles from './styles.module.css';
import ActionButton from '../ActionButton';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { formatDate } from '../../utils/formatDate';

export default function Confirm() {

  const { closeConfirm, closeModal } = useActions();

  const card = useAppSelector((state) => state.currentCard.currentCard);

  function confirm() {
    console.log('ok');
    closeModal();
    closeConfirm();
    // сделать открытие попапа
  }

  console.log(card)

  function cancel() {
    console.log('cancel');
    closeConfirm();
  }

  return (
    <section className={styles.confirm}>
      <h3 className={styles.confirm__header}>Отключить продление Изи Иви?</h3>
      <p className={styles.confirm__description}>
        Подписка перестанет действовать{' '}
        {card ? formatDate(card.end_date, '2-digit', false) : ''}
      </p>
      <div className={styles.confirm__buttons}>
        <div className={styles.confirm__button} onClick={() => cancel()}>
          <ActionButton title="Не сейчас" />
        </div>
        <div className={styles.confirm__button} onClick={() => confirm()}>
          <ActionButton title="Отключить" />
        </div>
      </div>
    </section>
  );
}
