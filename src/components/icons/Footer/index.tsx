import styles from './styles.module.css';

export default function Layout() {
  return (
    <footer className={styles.footer}>
      <svg
        width="375"
        height="34"
        viewBox="0 0 375 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="375" height="34" fill="#F1F5F9" />
        <rect x="121" y="21" width="134" height="5" rx="2.5" fill="black" />
      </svg>
    </footer>
  );
}
