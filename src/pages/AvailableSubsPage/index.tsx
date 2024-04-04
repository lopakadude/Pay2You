import Navbar from '../../components/Navbar';
import SubsList from '../../components/SubsList';
import { useAppSelector } from '../../hooks/redux';
import styles from './styles.module.css';
import {
  useGetCategoriesQuery,
  useLazyGetCoversQuery,
} from '../../store/pay2u/pay2u.api';
import { useEffect, useState } from 'react';
import { useActions } from '../../hooks/actions';

export default function AvailableSubsPage() {
  const currentCovers = useAppSelector((state) => state.covers.covers);
  const [triggerCovers] = useLazyGetCoversQuery();
  const { setCovers } = useActions();
  const { data: categories } = useGetCategoriesQuery();
  const [activeCategory, setActiveCategory] = useState(0);

  console.log(currentCovers);

  useEffect(() => {
    triggerCovers()
      .unwrap()
      .then((covers) => setCovers(covers.results));
  }, []);

  function filterCovers() {
    if (activeCategory === 0 && currentCovers) {
      return currentCovers;
    }
    if (currentCovers) {
      return currentCovers.filter(
        (cover) => cover.categories[0] === activeCategory
      );
    } else {
      return [];
    }
  }

  return (
    <section className={styles.availableSubsPage}>
      <Navbar />
      <h1 className={styles.availableSubsPage__header}>Каталог</h1>
      <ul className={styles.availableSubsPage__categoriesList}>
        <li
          className={`${styles.availableSubsPage__category} ${
            activeCategory === 0
              ? styles.availableSubsPage__category_active
              : ''
          }`}
          onClick={() => setActiveCategory(0)}
        >
          Все
        </li>
        {categories?.map((category) => (
          <li
            className={`${styles.availableSubsPage__category} ${
              activeCategory === category.id
                ? styles.availableSubsPage__category_active
                : ''
            }`}
            onClick={() => setActiveCategory(category.id)}
            key={category.id}
          >
            {category.name}
          </li>
        ))}
      </ul>
      <SubsList
        type="grid"
        data={filterCovers()}
        colorDescription="secondary"
        attachment="offer"
      />
    </section>
  );
}
