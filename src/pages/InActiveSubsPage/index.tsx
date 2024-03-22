import Navbar from '../../components/Navbar';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

export default function InActiveSubsPage() {

  return (
    <section className={styles.inActiveSubsPage}>
      <Navbar />
      <h1 className={styles.inActiveSubsPage__header}>Неактивные подписки</h1>
    </section>
  )
}
