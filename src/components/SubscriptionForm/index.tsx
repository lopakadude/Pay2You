import styles from './styles.module.css';
import ActionButton from '../ActionButton';
import { useActions } from '../../hooks/actions';
// import { formatDate } from '../../utils/formatDate';
import {
  usePatchAutorenewalTrueCardMutation,
  usePostNewActiveSubMutation,
} from '../../store/pay2u/pay2u.api';
import spb from '../../assets/logo_sbp43x24.svg';
import newCard from '../../assets/newCard.svg';
import numberAboutIcon from '../../assets/NumberAboutIcon.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '../../hooks/redux';
import { useState } from 'react';
import prolongation from '../../assets/aboutProlongatiion.jpg';

type Inputs = {
  phone_number: string;
  methodOfPayment: string;
  rules: boolean;
};

export default function SubscriptionForm({
  card,
  inActive,
  logolink,
}: {
  card: MyCardType;
  inActive?: boolean;
  logolink?: string;
}) {
  const {
    openPopup,
    openSuccessPage,
    openFailPage,
    setNewSub,
    closeModal,
    setError,
  } = useActions();
  const [isApplyClicked, setIsApplyClicked] = useState(false);

  const user = useAppSelector((state) => state.user.currentUser);

  const [patchRenewalTrueCard] = usePatchAutorenewalTrueCardMutation();
  console.log(card);

  const [postNewSubscription] = usePostNewActiveSubMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async () => {
    if (!inActive) {
      await postNewSubscription({
        id: card.id,
        period: 'monthly',
        // phone_number: data.phone_number,
      })
        .unwrap()
        .then((res) => {
          openSuccessPage();
          setNewSub(res);
          closeModal();
        })
        .catch((error) => {
          setError(error);
          openFailPage();
          closeModal();
        });
    }
    if (inActive) {
      await patchRenewalTrueCard(card.id)
        .unwrap()
        .then((res) => {
          openSuccessPage();
          setNewSub(res);
          closeModal();
        })
        .catch((error) => {
          setError(error);
          openFailPage();
          closeModal();
        });
    }
  };

  const onApplyClick: SubmitHandler<Inputs> = async () => {
    await setIsApplyClicked(true);
  };

  console.log(errors.phone_number);

  return (
    <section className={styles.subccriptionForm}>
      {card && (
        <div>
          {!isApplyClicked && (
            <div>
              <div className={styles.subccriptionForm__header}>
                <img
                  src={`https://pay2u.ddns.net/${logolink}`}
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
              <h2 className={styles.subccriptionForm__titleAttention}>Важно</h2>
              <img src={prolongation} alt="пролонгация" />
              <p className={styles.subccriptionForm__prolongationText}>
                Чтобы подписка продлялась автоматически, вам надо привязать
                карту при оплате
              </p>
            </div>
          )}
          <form
            onSubmit={
              isApplyClicked
                ? handleSubmit(onSubmit)
                : handleSubmit(onApplyClick)
            }
            noValidate
          >
            {!isApplyClicked && (
              <div className={styles.subscriptionForm__inputNumberContainer}>
                <input
                  type="tel"
                  placeholder="89009999999"
                  className={`${styles.subscriptionForm__inputNumber} ${
                    errors.phone_number
                      ? styles.subscriptionForm__inputNumberIsError
                      : ''
                  }`}
                  defaultValue={`8${user.phone_number}`}
                  {...register('phone_number', {
                    required: true,
                    pattern: {
                      value: /^(\+7|8)(\(?\d{3}\)?)?[\d\- ]{10}$/i,
                      message: 'Неверный формат телефона',
                    },
                  })}
                />
                {errors.phone_number &&
                  errors.phone_number.type === 'pattern' && (
                    <span className={styles.subscriptionForm__inputNumberError}>
                      Неверный формат телефона
                    </span>
                  )}
                {errors.phone_number &&
                  errors.phone_number.type === 'required' && (
                    <span className={styles.subscriptionForm__inputNumberError}>
                      Введите номер телефона
                    </span>
                  )}
                <p
                  className={`${styles.subscriptionForm__paymentMethod} ${styles.subscriptionForm__secondaryText}`}
                >
                  Способ оплаты
                </p>
                <div className={styles.subscriptionForm__inputsContainer}>
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
                  <div className={styles.subscriptionForm__inputContainer}>
                    <input
                      id="sbp"
                      type="radio"
                      className={styles.subscriptionForm__input}
                      {...register('methodOfPayment', {
                        required: true,
                      })}
                      checked
                    />
                    <label
                      htmlFor="sbp"
                      className={styles.subscriptionForm__label}
                    >
                      <img src={spb} alt="спб" />
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
                  {errors.rules && (
                    <span className={styles.subscriptionForm__errorRules}>
                      Подтвердите согласие с правилами подписки
                    </span>
                  )}
                </div>
              </div>
            )}
            {!isApplyClicked ? (
              <div className={styles.subscriptionForm__applyButton}>
                <ActionButton title="Оформить" active type="submit" />
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
