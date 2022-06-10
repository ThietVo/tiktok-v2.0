import styles from "./Modal.module.scss";

function Modal({ children }) {

  return (
    <div className={styles.modal}>
      <div className={styles.modalOverlay}></div>

      <div className={styles.modalBody}>
        { children }
      </div>
    </div>
  );
}

export default Modal;
