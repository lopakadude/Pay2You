import styles from './styles.module.css';
import { mySubsArray } from '../../utils/mockData';
import ActionButton from '../ActionButton';
import { useActions } from '../../hooks/actions';

export default function ActiveCardInfo({ cardId }: { cardId: string }) {
  const card = mySubsArray.find((mySub) => mySub.id === cardId);
  console.log(card);
  const { closeConfirm, closeModal } = useActions();

  function confirm() {
    console.log('ok');
    closeModal();
    closeConfirm();
    // сделать открытие попапа
  }

  function cancel() {
    console.log('cancel');
    closeModal();
    closeConfirm();
  }

  return (
    <section className={styles.confirm}>
      <h3 className={styles.confirm__header}>Отключить продление Изи Иви?</h3>
      <p className={styles.confirm__description}>
        Подписка перестанет действовать {card?.date}
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
