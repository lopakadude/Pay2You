import styles from './styles.module.css';

export default function SuccessPage({
  data,
}: {
  data: {
    data: { error: string };
    status: number;
  };
}) {
  console.log(data);

  return (
    <section className={styles.failPage}>
      <h1>{data.data.error}</h1>
    </section>
  );
}
