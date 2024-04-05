import styles from './styles.module.css';
import alert from '../../assets/alert-circle.svg';
import ActionButton from '../../components/ActionButton';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/actions';

export default function FailPage({
  data,
}: {
  data: {
    data: { error: string };
    status: number;
  };
}) {
  console.log(data.data.error);
  const navigate = useNavigate();
  const { openModal, closeFailPage } = useActions();

  return (
    <section className={styles.failPage}>
      {data.data.error[0] === 'Недостаточно средств на счете' && (
        <div className={styles.failPage__container}>
          <img
            src={alert}
            alt="внимание"
            className={styles.failPage__alertIcon}
          />
          <h1 className={styles.failPage__title}>Ошибка оплаты</h1>
          <p className={styles.failPage__description}>
            Проверьте, достаточно ли средств на вашем счёте, или попробуйте
            оплатить ещё раз
          </p>
          <div
            className={styles.failPage__payButton}
            onClick={() => {
              openModal();
              closeFailPage();
            }}
          >
            <ActionButton title="Оплатить" active />
          </div>
          <div
            className={styles.failPage__buttonToPartner}
            onClick={() => navigate('/all-subs', { replace: true })}
          >
            <ActionButton title="Перейти к Предложениям партнёров" />
          </div>
        </div>
      )}
      {data.data.error[0] === 'Вы уже подписаные на один из тарифов' && (
        <div>
          <p>Вы уже подписаны на один из тарифов</p>
          <div
            className={styles.failPage__buttonToPartner}
            onClick={() => navigate('/all-subs', { replace: true })}
          >
            <ActionButton title="Перейти к Предложениям партнёров" />
          </div>
        </div>
      )}
    </section>
  );
}
