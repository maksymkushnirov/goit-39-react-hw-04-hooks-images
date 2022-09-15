import { useEffect } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ onCloseModal, largeImage }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  };

  return (
    <div className={styles.Overlay} onClick={onCloseModal}>
      <div className={styles.Modal}>
        <img src={largeImage} alt="description" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};

export default Modal;