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

export default function AvailableSubsPage() {
  const currentCovers = useAppSelector((state) => state.covers.covers);
  const [triggerCovers] = useLazyGetCoversQuery();
  const { setCovers } = useActions();
  const { data: categories } = useGetCategoriesQuery();
  const [activeCategory, setActiveCategory] = useState('Все');
  const [triggerCoversByCategory] = useLazyGetCoversByCategoryQuery();

  function filterCovers(activeCategory: string) {
    if (activeCategory === 'Все' && currentCovers) {
      triggerCovers()
        .unwrap()
        .then((covers) => setCovers(covers.results));
    }
    if (activeCategory !== 'Все' && currentCovers) {
      triggerCoversByCategory(activeCategory)
        .unwrap()
        .then((covers) => setCovers(covers.results));
    } else {
      return [];
    }
  }

  useEffect(() => {
    triggerCovers()
      .unwrap()
      .then((covers) => setCovers(covers.results));
  }, []);

  return (
    <section className={styles.availableSubsPage}>
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
      <SubsList
        type="grid"
        data={currentCovers}
        colorDescription="secondary"
        attachment="offer"
      />
    </section>
  );
}
