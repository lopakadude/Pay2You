import SubsList from '../../components/SubsList';
import { useAppSelector } from '../../hooks/redux';
import styles from './styles.module.css';
import {
  useGetCategoriesQuery,
  useLazyGetCoversQuery,
  useLazyGetCoversByCategoryQuery,
  useLazyGetCoversByNameQuery,
} from '../../store/pay2u/pay2u.api';
import { useEffect, useState } from 'react';
import { useActions } from '../../hooks/actions';
import Loader from '../../components/Loader';
import BackTo from '../../components/BackTo';
import SearchButton from '../../components/SearchButton';
import arrowInputfrom from '../../assets/InputLeftIcon.svg';

export default function AvailableSubsPage() {
  const currentCovers = useAppSelector((state) => state.covers.covers);
  const [triggerCovers] = useLazyGetCoversQuery();
  const { setCovers } = useActions();
  const { data: categories } = useGetCategoriesQuery();
  const [activeCategory, setActiveCategory] = useState('Все');
  const [triggerCoversByCategory] = useLazyGetCoversByCategoryQuery();
    const [triggerCoversByName] = useLazyGetCoversByNameQuery();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  function filterCoversByCategory(activeCategory: string) {
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

  function filterCoversByName(name: string) {
    if (currentCovers) {
      setIsLoading(true);
      triggerCoversByName(name)
        .unwrap()
        .then((covers) => setCovers(covers.results))
        .finally(() => setIsLoading(false));
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
        {isSearchOpen ? (
          <div className={styles.availableSubsPage__inputContainer}>
            <img
              src={arrowInputfrom}
              alt="стрелка назад"
              className={styles.availableSubsPage__inputArrow}
              onClick={() => setIsSearchOpen(false)}
            />
            <input
              type="text"
              className={styles.availableSubsPage__searchInput}
              placeholder="Введите название подписки"
              onChange={(evt) => {
                filterCoversByName(evt.target.value);
              }}
            />
          </div>
        ) : (
          <div className={styles.availableSubsPage__navbar}>
            <BackTo />
            <div
              className={styles.availableSubsPage__search}
              onClick={() => {
                setIsSearchOpen(true);
              }}
            >
              <SearchButton />
            </div>
          </div>
        )}
        {currentCovers && (
          <div>
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
                  filterCoversByCategory('Все');
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
                    filterCoversByCategory(category.name);
                  }}
                  key={category.id}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        )}
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
