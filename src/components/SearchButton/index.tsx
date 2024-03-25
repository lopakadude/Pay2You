import styles from './styles.module.css'

export default function SearchButton() {

  return (
    <button className={styles.searchButton}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.9268 17.0396L20.4 20.3996M19.28 11.4396C19.28 15.7695 15.7699 19.2796 11.44 19.2796C7.11006 19.2796 3.59998 15.7695 3.59998 11.4396C3.59998 7.1097 7.11006 3.59961 11.44 3.59961C15.7699 3.59961 19.28 7.1097 19.28 11.4396Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    </button>
  )
}