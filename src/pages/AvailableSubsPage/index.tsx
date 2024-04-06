import Navbar from '../../components/Navbar';
import SubsList from '../../components/SubsList';
import { useAppSelector } from '../../hooks/redux';
import styles from './styles.module.css';
import {
  useGetCategoriesQuery,
  useLazyGetCoversQuery,
  useLazyGetCoversByCategoryQuery,
} from '../../store/pay2u/pay2u.api';
import { useEffect, useState } from 'react';
import { useActions } from '../../hooks/actions';
import Loader from '../../components/Loader';

export default function AvailableSubsPage() {
  const currentCovers = useAppSelector((state) => state.covers.covers);
  const [triggerCovers] = useLazyGetCoversQuery();
  const { setCovers } = useActions();
  const { data: categories } = useGetCategoriesQuery();
  const [activeCategory, setActiveCategory] = useState('Все');
  const [triggerCoversByCategory] = useLazyGetCoversByCategoryQuery();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function filterCovers(activeCategory: string) {
    if (activeCategory === 'Все' && currentCovers) {
      setIsLoading(true);
      triggerCovers()
        .unwrap()
        .then((covers) => setCovers(covers.results))
        .finally(() => setIsLoading(false));
    }
    if (activeCategory !== 'Все' && currentCovers) {
      setIsLoading(true);
      triggerCoversByCategory(activeCategory)
        .unwrap()
        .then((covers) => setCovers(covers.results))
        .finally(() => setIsLoading(false));
    } else {
      return [];
    }
  }

  useEffect(() => {
    setIsLoading(true);
    triggerCovers()
      .unwrap()
      .then((covers) => setCovers(covers.results))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className={styles.availableSubsPage}>
      <div className={styles.availableSubsPage__container}>
        <Navbar />
        <h1 className={styles.availableSubsPage__header}>Каталог</h1>
        <ul className={styles.availableSubsPage__categoriesList}>
          <li
            className={`${styles.availableSubsPage__category} ${
              activeCategory === 'Все'
                ? styles.availableSubsPage__category_active
                : ''
            }`}
            onClick={() => {
              setActiveCategory('Все');
              filterCovers('Все');
            }}
          >
            Все
          </li>
          {categories?.map((category) => (
            <li
              className={`${styles.availableSubsPage__category} ${
                activeCategory === category.name
                  ? styles.availableSubsPage__category_active
                  : ''
              }`}
              onClick={() => {
                setActiveCategory(category.name);
                filterCovers(category.name);
              }}
              key={category.id}
            >
              {category.name}
            </li>
          ))}
        </ul>
        {isLoading ? (
          <Loader />
        ) : (
          <SubsList
            type="grid"
            data={currentCovers}
            colorDescription="secondary"
            attachment="offer"
          />
        )}
      </div>
    </section>
  );
}
