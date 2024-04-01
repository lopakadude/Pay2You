import styles from './styles.module.css';
import ActionButton from '../ActionButton';
// import { useActions } from '../../hooks/actions';
// import { useAppSelector } from '../../hooks/redux';
// import { formatDate } from '../../utils/formatDate';
// import { usePatchAutorenewalFalseCardMutation } from '../../store/pay2u/pay2u.api';
import spb from '../../assets/logo_sbp43x24.svg';
import newCard from '../../assets/newCard.svg';
import numberAboutIcon from '../../assets/NumberAboutIcon.svg';

export default function SubscriptionForm({ card }: { card: MyCardType }) {
  // const { closeConfirm, closeModal, openPopup } = useActions();

  // const card = useAppSelector((state) => state.currentCard.currentCard);

  // const [patchRenewalFalseCard] = usePatchAutorenewalFalseCardMutation();

  // async function confirm() {
  //   try {
  //     await patchRenewalFalseCard( card.id ).unwrap();
  //     closeModal();
  //     closeConfirm();
  //     openPopup();
  //   } catch (error) { console.log(error)}
  // }

  // function cancel() {
  //   console.log('cancel');
  //   closeConfirm();
  // }

  function handleSubmit() {
    console.log('submit');
  }

  return (
    <section className={styles.subccriptionForm}>
      {card && (
        <div>
          <div className={styles.subccriptionForm__header}>
            <img
              src={`https://pay2u.ddns.net/${card.logo_link}`}
              alt={card.name}
              className={styles.subccriptionForm__serviceLogo}
            />
            <h2 className={styles.subccriptionForm__title}>{card.name}</h2>
          </div>
          <p
            className={`${styles.subscriptionForm__description} ${styles.subscriptionForm__secondaryText}`}
          >
            {Math.trunc(card.monthly_price)} ₽ каждый месяц с кешбэком{' '}
            {Math.trunc(card.cashback_percent)}%
          </p>
          <p
            className={`${styles.subscriptionForm__description} ${styles.subscriptionForm__secondaryText}`}
          >
            Первые 30 дней бесплатно
          </p>
          <div className={styles.subscriptionForm__numberContainer}>
            <p className={`${styles.subscriptionForm__secondaryText}`}>
              Номер телефона
            </p>
            <button className={styles.subscriptionForm__aboutButton}>
              <img src={numberAboutIcon} alt="иконка о номере" />
            </button>
          </div>
          <form onSubmit={() => handleSubmit()}>
            <input
              type="text"
              placeholder="+ 7 (900) 999-99-99"
              className={styles.subscriptionForm__inputNumber}
              pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
            />
            <p
              className={`${styles.subscriptionForm__paymentMethod} ${styles.subscriptionForm__secondaryText}`}
            >
              Способ оплаты
            </p>
            <div className={styles.subscriptionForm__inputsContainer}>
              <div className={styles.subscriptionForm__inputContainer}>
                <input
                  id="spb"
                  type="radio"
                  name="MethodOfPayment"
                  className={styles.subscriptionForm__input}
                />
                <label htmlFor="spb" className={styles.subscriptionForm__label}>
                  <img src={spb} alt="спб" />
                </label>
              </div>
              <div className={styles.subscriptionForm__inputContainer}>
                <input
                  id="newCard"
                  type="radio"
                  name="MethodOfPayment"
                  className={styles.subscriptionForm__input}
                  disabled
                />
                <label
                  htmlFor="newCard"
                  className={styles.subscriptionForm__label}
                >
                  <img src={newCard} alt="новая карта" />
                </label>
              </div>
            </div>
            <div className={styles.subscriptionForm__checkboxContainer}>
              <input
                type="checkbox"
                name="rules"
                className={styles.subscriptionForm__checkbox}
                required
              />
              <label
                htmlFor="rules"
                className={styles.subscriptionForm__checkboxLabel}
              >
                <p className={styles.subscriptionForm__rulesText}>
                  Согласен с{' '}
                  <a href="" className={styles.subscriptionForm__linkToRules}>
                    правилами подписки
                  </a>
                </p>
              </label>
            </div>
            <ActionButton title="Оформить" active type="submit" />
            <p className={styles.subscriptionForm__personalDataText}>
              Нажимая «Оформить» вы соглашаетесь с{' '}
              <a href="" className={styles.subscriptionForm__personalDataLink}>
                Политикой обработки персональных данных
              </a>
            </p>
          </form>
        </div>
      )}
    </section>
  );
}
