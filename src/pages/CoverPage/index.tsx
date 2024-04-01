import { useAppSelector } from '../../hooks/redux';
import styles from './styles.module.css';
import { useLazyGetCoverInfoQuery } from '../../store/pay2u/pay2u.api';
import { useEffect, useState } from 'react';
import BackTo from '../../components/BackTo/index';
import greenCheck from '../../assets/check-broken_green.svg';
import ActionButton from '../../components/ActionButton';
import purpleSquare from '../../assets/squarePurpleIcon.svg';
import { useActions } from '../../hooks/actions';
import Modal from '../../components/Modal';
import SubscriptionForm from '../../components/SubscriptionForm';

export default function CoverPage() {
  const coverId = useAppSelector(
    (state) => state.currentCoverId.currentCoverId
  );
  const [triggerCover, { data: currentCover }] = useLazyGetCoverInfoQuery();
  const [isCoverDescriptionOpened, setIsCoverDescriptionOpened] =
    useState(false);
  const [selectedCoverCard, setSelectedCoverCard] = useState<MyCardType>();
  const isModalOpen = useAppSelector((state) => state.modal.isModalOpened);
  const { openModal } = useActions();

  useEffect(() => {
    triggerCover(coverId).unwrap();
  }, []);

  console.log(currentCover)

  const date = () => {
    if (new Date().getDate() === 31) {
      return 1
    } else { return new Date().getDate();}
  }

  const handleSubButtonClick = (cover: MyCardType) => {
    setSelectedCoverCard(cover);
    openModal();
  }

  return (
    <section className={styles.currentCover}>
      {currentCover && !isCoverDescriptionOpened && (
        <div>
          <BackTo />
          <div className={styles.currentCover__header}>
            <img
              src={`https://pay2u.ddns.net/${currentCover.logo_link}`}
              alt={`лого ${currentCover.name}`}
              className={styles.currentCover__logo}
            />
            <h1 className={styles.currentCover__title}>{currentCover.name}</h1>
          </div>
          <ul className={styles.coversList}>
            {currentCover.subscriptions.map((cover) => (
              <li key={cover.id} className={styles.cover}>
                <h2 className={styles.cover__subtitle}>{cover.name}</h2>
                <p className={styles.cover__description}>{cover.description}</p>
                <p className={styles.cover__subscribeCondition}>
                  {!cover.is_subscribed && (
                    <img
                      src={greenCheck}
                      alt="иконка чек"
                      className={styles.cover__checkLogo}
                    />
                  )}
                  {cover.is_subscribed
                    ? 'Подписка подключена'
                    : '30 дней за 1 ₱'}
                </p>
                <button
                  className={styles.cover__buttonAbout}
                  onClick={() => {
                    setIsCoverDescriptionOpened(true);
                    setSelectedCoverCard(cover);
                  }}
                >
                  Подробнее о подписке
                </button>
                <p className={styles.cover__price}>
                  {Math.trunc(cover.monthly_price)} &#8381;
                </p>
                <p className={styles.cover__period}>Ежемесячно</p>
                <div className={styles.cover__cashbackContainer}>
                  <p className={styles.cover__cashback}>
                    Кешбэк {Math.trunc(cover.cashback_percent)}%
                  </p>
                </div>
                {!cover.is_subscribed && (
                  <div
                    className={styles.cover__actionButton}
                    onClick={() => {
                      handleSubButtonClick(cover);
                    }}
                  >
                    <ActionButton title="Подключить" active size="m" />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isCoverDescriptionOpened && selectedCoverCard && currentCover && (
        <div className={styles.coverCard}>
          <BackTo setIsCoverDescriptionOpened={setIsCoverDescriptionOpened} />
          <div className={styles.currentCover__header}>
            <img
              src={`https://pay2u.ddns.net/${currentCover.logo_link}`}
              alt="лого"
              className={styles.currentCover__logo}
            />
            <h1 className={styles.currentCover__title}>
              {selectedCoverCard.name}
            </h1>
          </div>
          <ul className={styles.coverCard__list}>
            <li className={styles.coverCard__item}>
              <img
                src={purpleSquare}
                alt="квадрат"
                className={styles.coverCard__numberContainer}
              />
              <p className={styles.coverCard__itemDescription}>
                Первые 30 дней бесплатно, потом{' '}
                {Math.trunc(selectedCoverCard.monthly_price)} ₽ каждый месяц
              </p>
              <p className={styles.coverCard__itemNumber}>1</p>
            </li>
            <li className={styles.coverCard__item}>
              <img
                src={purpleSquare}
                alt="квадрат"
                className={styles.coverCard__numberContainer}
              />
              <p className={styles.coverCard__itemDescription}>
                Будем начислять кешбэк{' '}
                {Math.trunc(selectedCoverCard.cashback_percent)}% каждый месяц{' '}
                {date()} числа
              </p>
              <p className={styles.coverCard__itemNumber}>2</p>
            </li>
            <li className={styles.coverCard__item}>
              <img
                src={purpleSquare}
                alt="квадрат"
                className={styles.coverCard__numberContainer}
              />
              <p className={styles.coverCard__itemDescription}>
                {selectedCoverCard.description}
              </p>
              <p className={styles.coverCard__itemNumber}>3</p>
            </li>
            <li className={styles.coverCard__item}>
              <img
                src={purpleSquare}
                alt="квадрат"
                className={styles.coverCard__numberContainer}
              />
              <p className={styles.coverCard__itemDescription}>
                Фильмотека свыше 3000 фильмов и сериалов
              </p>
              <p className={styles.coverCard__itemNumber}>4</p>
            </li>
            <li className={styles.coverCard__item}>
              <img
                src={purpleSquare}
                alt="квадрат"
                className={styles.coverCard__numberContainer}
              />
              <p className={styles.coverCard__itemDescription}>
                Разные направления контента: каждый найдёт интересное для себя
              </p>
              <p className={styles.coverCard__itemNumber}>5</p>
            </li>
          </ul>
          <div
            className={styles.coverCard__actionButton}
            onClick={() => {
              handleSubButtonClick(selectedCoverCard);
            }}
          >
            <ActionButton active title="Подключить" />
          </div>
          <a
            className={styles.coverCard__offer}
            href={currentCover.service_link}
            target="_blank"
          >
            Подробнее об оферте {selectedCoverCard.name}
          </a>
        </div>
      )}
      {isModalOpen && selectedCoverCard && (
        <Modal content={<SubscriptionForm card={selectedCoverCard} />} />
      )}
    </section>
  );
}
