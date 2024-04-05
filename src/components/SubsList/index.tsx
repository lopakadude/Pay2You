import styles from './styles.module.css';
import { useActions } from '../../hooks/actions';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';

export default function SubsList({
  data,
  type,
  colorDescription,
  colorSсheme,
  setSelectedActiveCard,
  setSelectedInActiveCard,
  attachment,
}: {
  data: MyCardType[];
  type: string;
  colorDescription?: string;
  colorSсheme?: string;
  setSelectedActiveCard?: (id: number) => void;
  setSelectedInActiveCard?: (id: number) => void;
  attachment: string;
}) {
  const navigate = useNavigate();
  const { openModal, setCurrentCoverId } = useActions();
  const handleCardClick = (id: number) => {
    if (attachment === 'myActive' && setSelectedActiveCard) {
      setSelectedActiveCard(id);
      openModal();
    }
    if (attachment === 'myInActive' && setSelectedInActiveCard) {
      setSelectedInActiveCard(id);
      openModal();
    }
    if (attachment === 'offer') {
      setCurrentCoverId(id);
      navigate(`/available-subs/${id}`);
    }
  };

  const definePeriodTitle = (sub: MyCardType) => {
    if (sub.period === 'monthly') {
      return 'мес';
    } else if (sub.period === 'annual') {
      return 'год';
    }
  };

  // function leftDays(date: string): number {
  //   const [dd, mm, yyyy]: number[] = date.split('.').map(Number);
  //   const Till: Date = new Date(yyyy, mm - 1, dd);
  //   const Now: Date = new Date();
  //   return Math.floor((Till.getTime() - Now.getTime()) / 864e5);
  // }

  return (
    <ul
      className={`${styles.subsList} ${
        type === 'flex' ? `${styles.subsList_type_flex}` : ''
      } ${type === 'grid' ? `${styles.subsList_type_grid}` : ''}`}
    >
      {data.map((sub) => (
        <li
          key={sub.id}
          onClick={() => handleCardClick(sub.id)}
          className={`${styles.subsList__item} ${
            type === 'grid' ? `${styles.subsList__item_type_grid}` : ''
          } ${type === 'flex' ? `${styles.subsList__item_type_flex}` : ''}`}
        >
          <h2
            className={`${styles.subList__itemHeader} ${
              colorSсheme === 'none-active'
                ? `${styles.subList__itemHeader_color_noneActive}`
                : ''
            }`}
          >
            {sub.name}
          </h2>
          {colorSсheme !== 'none-active' && sub.autorenewal === true && (
            <p
              className={`${styles.subList__itemDescription} ${
                colorDescription === 'primary'
                  ? `${styles.subList__itemDescription_color_primary}`
                  : ''
              } ${
                colorDescription === 'secondary'
                  ? `${styles.subList__itemDescription_color_secondary}`
                  : ''
              }`}
            >
              {attachment === 'offer' ? sub.preview : sub.description}
            </p>
          )}
          {colorSсheme !== 'none-active' && sub.autorenewal === false && (
            <p
              className={`${styles.subList__itemDescription} ${styles.subList__itemDescription_attention}`}
            >
              Автопродление отключено
            </p>
          )}
          {type === 'flex' && colorSсheme !== 'none-active' && (
            <p className={styles.subList__itemDate}>
              до {formatDate(sub.end_date, '2-digit', false)}
            </p>
          )}
          {type === 'flex' && colorSсheme === 'none-active' && (
            <p className={styles.subList__itemDate}>
              истекла {formatDate(sub.end_date, '2-digit', false)}
            </p>
          )}
          {type === 'flex' && (
            <p
              className={`${styles.subList__itemCost} ${
                colorSсheme === 'none-active'
                  ? `${styles.subList__itemCost_color_noneActive}`
                  : ''
              }`}
            >
              {Math.trunc(sub.price)} &#x20bd;{' '}
              <span className={styles.subList__itemDuration}>
                {' '}
                в {definePeriodTitle(sub)}
              </span>
            </p>
          )}
          {type === 'grid' && (
            <p className={styles.subList__itemCost}>
              от {Math.trunc(sub.price)} &#x20bd;
            </p>
          )}
          {type === 'grid' && (
            <div className={styles.subList__itemCAshBackContainer}>
              <p className={styles.subList__itemCashBack}>
                Кешбэк {sub.cashback_percent}%
              </p>
            </div>
          )}
          <img
            src={`https://pay2u.ddns.net/${sub.logo_link}`}
            alt={sub.name}
            className={`${styles.subList__logo} ${
              type === 'grid' ? `${styles.subList__logo_type_grid}` : ''
            } ${type === 'flex' ? `${styles.subList__logo_type_flex}` : ''} ${
              colorSсheme === 'none-active'
                ? `${styles.subList__logo_color_noneActive}`
                : ''
            }`}
          />
        </li>
      ))}
    </ul>
  );
}
