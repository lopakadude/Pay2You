import styles from './styles.module.css';

export default function SubsList({
  data,
  type,
  colorDescription,
  colorSсheme,
}: {
  data: CardType[];
  type: string;
  colorDescription?: string;
  colorSсheme?: string;
}) {
  return (
    <ul
      className={`${styles.subsList} ${
        type === 'flex' ? `${styles.subsList_type_flex}` : ''
      } ${type === 'grid' ? `${styles.subsList_type_grid}` : ''}`}
    >
      {data.map((sub, i) => (
        <li
          key={i}
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
            <p className={`${styles.subList__itemCost} ${colorSсheme === 'none-active' ? `${styles.subList__itemCost_color_noneActive}` : ''}`}>
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
            src={colorSсheme !== 'none-active' ? sub.logo : sub.logo_inactive}
            alt={sub.name}
            className={`${styles.subList__logo} ${
              type === 'grid' ? `${styles.subList__logo_type_grid}` : ''
            } ${type === 'flex' ? `${styles.subList__logo_type_flex}` : ''}`}
          />
        </li>
      ))}
    </ul>
  );
}
