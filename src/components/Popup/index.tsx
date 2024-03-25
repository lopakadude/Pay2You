import styles from './styles.module.css';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';

export default function Popup({ content }: { content: JSX.Element }) {
  const isPopupOpened = useAppSelector((state) => state.popup.isPopupOpened);
  const { closePopup } = useActions();

  function handleClosePopup() {
    closePopup();
  }

  return (
    <div
      className={`${styles.popup} ${
        isPopupOpened === true && `${styles.modal_active}`
      }`}
      onClick={handleClosePopup}
    >
      <div className={styles.modal__content}>{content}</div>
    </div>
  );
}
