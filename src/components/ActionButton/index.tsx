import styles from './styles.module.css'

export default function ActionButton({
  children,
  size,
}: {
  children: string,
  size?: string,
}) {
  return (
    <button
      className={`${styles.actionButton} ${size === 's' ? `${styles.actionButton_size_s}` : ''} ${size === 'm' ? `${styles.actionButton_size_m}` : ''
        }`}>
      {children}
    </button>
  );
}