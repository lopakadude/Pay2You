import styles from './styles.module.css';
import ActionButton from '../ActionButton';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { formatDate } from '../../utils/formatDate';
import { usePatchAutorenewalFalseCardMutation } from '../../store/pay2u/pay2u.api';

export default function Confirm() {

  const { closeConfirm, closeModal, openPopup } = useActions();

  const card = useAppSelector((state) => state.currentCard.currentCard);

  const [patchRenewalFalseCard] = usePatchAutorenewalFalseCardMutation();

  async function confirm() {
    try {
      await patchRenewalFalseCard( card.id ).unwrap();
      closeModal();
      closeConfirm();
      openPopup();
      console.log(card)
    } catch (error) { console.log(error)}
  }

  function cancel() {
    console.log('cancel');
    closeConfirm();
  }

  return (
    <section className={styles.confirm}>
      <h3 className={styles.confirm__header}>Отключить продление Изи Иви?</h3>
      <p className={styles.confirm__description}>
        Подписка перестанет действовать{' '}
        {formatDate(card.end_date, '2-digit', false)}
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
