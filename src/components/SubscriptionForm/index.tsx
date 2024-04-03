import styles from './styles.module.css';
import ActionButton from '../ActionButton';
import { useActions } from '../../hooks/actions';
// import { formatDate } from '../../utils/formatDate';
import { usePostNewActiveSubMutation } from '../../store/pay2u/pay2u.api';
import spb from '../../assets/logo_sbp43x24.svg';
import newCard from '../../assets/newCard.svg';
import numberAboutIcon from '../../assets/NumberAboutIcon.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '../../hooks/redux';
import { useState } from 'react';
import prolongation from '../../assets/aboutProlongatiion.jpg';


type Inputs = {
  phone_number: string;
  methodOfPayment: boolean;
  rules: boolean;
};

export default function SubscriptionForm({ card }: { card: MyCardType }) {
  const { openPopup, openSuccessPage, openFailPage, setNewSub, closeModal, setError } =
    useActions();
  const [isApplyClicked, setIsApplyClicked] = useState(false);

  const user = useAppSelector((state) => state.user.currentUser);
  // const card = useAppSelector((state) => state.currentCard.currentCard);

  // const [patchRenewalFalseCard] = usePatchAutorenewalFalseCardMutation();

  const [postNewSubscription] = usePostNewActiveSubMutation();

  const handleApplyClick = async () => {
    await setIsApplyClicked(true);
  };

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

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async () => {
    await postNewSubscription({
      id: card.id,
      period: 'monthly',
    })
      .unwrap()
      .then((res) => {
        openSuccessPage();
        setNewSub(res);
        closeModal();
        console.log(res);
      })
      .catch((error) => {
        setError(error);
        openFailPage();
        closeModal();
      });
  };

  return (
    <section className={styles.subccriptionForm}>
      {card && (
        <div>
          {!isApplyClicked && (
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
                <button
                  className={styles.subscriptionForm__aboutButton}
                  onClick={() => {
                    openPopup();
                  }}
                >
                  <img src={numberAboutIcon} alt="иконка о номере" />
                </button>
              </div>
            </div>
          )}
          {isApplyClicked && (
            <div>
              <h2 className={styles.subccriptionForm__title}>Важно</h2>
              <img src={prolongation} alt="пролонгация" />
              <p className={styles.subccriptionForm__prolongationText}>
                Чтобы подписка продлялась автоматически, вам надо привязать
                карту при оплате
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            {!isApplyClicked && (
              <div>
                <input
                  type="tel"
                  placeholder="+ 7 (900) 999-99-99"
                  className={styles.subscriptionForm__inputNumber}
                  defaultValue={user.phone_number}
                  {...register('phone_number', {
                    required: true,
                    // pattern: 7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2},
                  })}
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
                      className={styles.subscriptionForm__input}
                      {...register('methodOfPayment', { required: true })}
                    />
                    <label
                      htmlFor="spb"
                      className={styles.subscriptionForm__label}
                    >
                      <img src={spb} alt="спб" />
                    </label>
                  </div>
                  <div className={styles.subscriptionForm__inputContainer}>
                    <input
                      id="newCard"
                      type="radio"
                      className={styles.subscriptionForm__input}
                      {...register('methodOfPayment')}
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
                    id="rules"
                    type="checkbox"
                    className={styles.subscriptionForm__checkbox}
                    {...register('rules', { required: true })}
                  />
                  <label
                    htmlFor="rules"
                    className={styles.subscriptionForm__checkboxLabel}
                  >
                    <p className={styles.subscriptionForm__rulesText}>
                      Согласен с{' '}
                      <a
                        href="/sub-rules"
                        className={styles.subscriptionForm__linkToRules}
                      >
                        правилами подписки
                      </a>
                    </p>
                  </label>
                </div>
              </div>
            )}
            {!isApplyClicked ? (
              <div
                className={styles.subscriptionForm__applyButton}
                onClick={() => handleApplyClick()}
              >
                <ActionButton title="Оформить" active />
              </div>
            ) : (
              <ActionButton title="Оплатить" active type="submit" />
            )}

            {!isApplyClicked && (
              <p className={styles.subscriptionForm__personalDataText}>
                Нажимая «Оформить» вы соглашаетесь с{' '}
                <a
                  href="/privacy-policy"
                  className={styles.subscriptionForm__personalDataLink}
                >
                  Политикой обработки персональных данных
                </a>
              </p>
            )}
          </form>
        </div>
      )}
    </section>
  );
}
