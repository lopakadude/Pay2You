import Navbar from '../../components/Navbar';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

export default function AvailableSubsPage() {

  return (
    <section className={styles.availableSubsPage}>
      <Navbar />
      <h1 className={styles.availableSubsPage__header}>Подписки партнёров</h1>
    </section>
  )
}