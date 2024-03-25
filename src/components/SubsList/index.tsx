import styles from './styles.module.css';
import { useActions } from '../../hooks/actions';

export default function SubsList({
  data,
  type,
  colorDescription,
  colorSсheme,
  setSelectedCard,
}: {
  data: CardType[];
  type: string;
  colorDescription?: string;
  colorSсheme?: string;
  setSelectedCard: (id: string) => void;
}) {
  const { openModal } = useActions();
  const handleCardClick = (id: string) => {
    setSelectedCard(id);
    openModal();
  };

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
          {colorSсheme !== 'none-active' && (
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
              {sub.description}
            </p>
          )}
          {type === 'flex' && colorSсheme !== 'none-active' && (
            <p className={styles.subList__itemDate}>до {sub.date}</p>
          )}
          {type === 'flex' && colorSсheme === 'none-active' && (
            <p className={styles.subList__itemDate}>истекла {sub.date}</p>
          )}
          {type === 'flex' && (
            <p
              className={`${styles.subList__itemCost} ${
                colorSсheme === 'none-active'
                  ? `${styles.subList__itemCost_color_noneActive}`
                  : ''
              }`}
            >
              {sub.cost} &#x20bd;{' '}
              <span className={styles.subList__itemDuration}>
                {' '}
                в {sub.duration}
              </span>
            </p>
          )}
          {type === 'grid' && (
            <p className={styles.subList__itemCost}>от {sub.cost} &#x20bd;</p>
          )}
          {type === 'grid' && (
            <div className={styles.subList__itemCAshBackContainer}>
              <p className={styles.subList__itemCashBack}>
                Кешбэк {sub.cashBack}%
              </p>
            </div>
          )}
          <img
            src={sub.logo}
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
