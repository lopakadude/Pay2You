import { useAppSelector } from '../../hooks/redux';
import styles from './styles.module.css';
import { useLazyGetCoverInfoQuery } from '../../store/pay2u/pay2u.api';
import { useEffect } from 'react';
import BackTo from '../../components/BackTo/index';
import greenCheck from '../../assets/check-broken_green.svg';

export default function CoverPage() {
  const coverId = useAppSelector(
    (state) => state.currentCoverId.currentCoverId
  );
  const [triggerCover, { data: currentCover }] = useLazyGetCoverInfoQuery();

  useEffect(() => {
    triggerCover(coverId).unwrap();
  }, []);

  return (
    <section className={styles.currentCover}>
      {currentCover && (
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
                <button className={styles.cover__buttonAbout}>
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
