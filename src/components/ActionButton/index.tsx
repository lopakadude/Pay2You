import styles from './styles.module.css';

export default function ActionButton({
  title,
  size,
  active,
}: {
  title: string;
  size?: string;
  active?: boolean;
}) {
  return (
    <button
      className={`${styles.actionButton} ${
        size === 's' ? `${styles.actionButton_size_s}` : ''
      } ${size === 'm' ? `${styles.actionButton_size_m}` : ''} ${
        size === 'xs' ? `${styles.actionButton_size_xs}` : ''
      } ${active ? `${styles.actionButton_active}` : ''}`}
    >
      {title}
    </button>
  );
}
