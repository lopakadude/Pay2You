import styles from './styles.module.css';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';

export default function Modal({
  content,
  setSelectedActiveCard,
  setSelectedInActiveCard,
}: {
  content: JSX.Element;
  setSelectedActiveCard?: (id: number) => void;
  setSelectedInActiveCard?: (id: number) => void;
}) {
  const isModalOpened = useAppSelector((state) => state.modal.isModalOpened);
  const { closeModal, closeConfirm } = useActions();

  function handleCloseModal() {
        if ( setSelectedActiveCard) {
          setSelectedActiveCard(0);
        }
        if (setSelectedInActiveCard) {
          setSelectedInActiveCard(0);
        }
    closeModal();
    closeConfirm();
  }

  return (
    <div
      className={`${styles.modal} ${
        isModalOpened === true && `${styles.modal_active}`
      }`}
    >
      <div className={styles.modal__overlay} onClick={handleCloseModal}></div>
      <div className={styles.modal__content}>{content}</div>
    </div>
  );
}
