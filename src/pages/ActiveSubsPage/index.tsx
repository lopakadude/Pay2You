import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/index';

export default function ActiveSubsPage() {

  return (
    <section className={styles.activeSubsPage}>
      <Navbar/>
      <h1 className={styles.activeSubsPage__header}>Активные подписки</h1>
    </section>
  )
}