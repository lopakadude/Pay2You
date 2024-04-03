import styles from './styles.module.css';
import greenCheck from '../../assets/check-brokenGreen60x60.svg';
import copyIcon from '../../assets/CopyIcon.svg';
import ActionButton from '../../components/ActionButton';
import { useNavigate } from 'react-router-dom';

export default function SuccessPage({ data }: { data: MyCardType }) {
  console.log(data);

  const navigate = useNavigate();
  function copyText(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => console.log('ok'))
      .catch(() => console.log('not ok'));
  }

  function defineActivePeriod() {
    const currentDate = new Date().toISOString().slice(0, 10);
    return currentDate;
  }

  console.log(defineActivePeriod());

  return (
    <section className={styles.successPage}>
      <img src={greenCheck} alt="" className={styles.successPage__logo} />
      <h1
        className={`${styles.successPage__title} ${styles.successPage__textPrimary}`}
      >
        Подписка {data.name} оплачена
      </h1>
      <p className={`${styles.successPage__textSecondary}`}>
        Для активации подписки скопируйте промокод и введите его на сайте
        партнера
      </p>
      <p
        className={`${styles.successPage__promocode} ${styles.successPage__textPrimary}`}
      >
        {data.promocode}
      </p>
      <div className={styles.successPage__textContainer}>
        <p className={styles.successPage__textSecondary}>
          Необходимо активировать до 10.10.2024
        </p>
        <p className={styles.successPage__textSecondary}>
          Мы сохраним промокод в информации о подписке, чтобы вы могли
          активировать его позже
        </p>
      </div>
      <a
        href={data.service_link}
        target="_blank"
        className={styles.successPage__linkToService}
        onClick={() => {
          copyText(data.promocode);
        }}
      >
        <img
          src={copyIcon}
          alt="иконка копирования"
          className={styles.successPage__copyIcon}
        />
        <p className={styles.successPage__linkText}>
          Скопировать и перейти на сайт
        </p>
      </a>
      <button>Скачать чек</button>
      <div
        className={styles.successPage__actionButton}
        onClick={() => navigate('/active-subs')}
      >
        <ActionButton title="Перейти в Активные подписки" />
      </div>
    </section>
  );
}
