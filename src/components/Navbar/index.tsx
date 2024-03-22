import BackTo from '../../components/BackTo';
import SearchButton from '../SearchButton/SearchButton';
import styles from './styles.module.css';

export default function Navbar() {

  return (
      <div className={styles.navbar}>
        <BackTo />
        <SearchButton />
      </div>
  )
}