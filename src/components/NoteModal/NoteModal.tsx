import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';
import styles from './NoteModal.module.css';

interface NoteModalProps {
  onClose: () => void;
}

const modalRoot = document.getElementById('modal-root')!;

const NoteModal = ({ onClose }: NoteModalProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <NoteForm onSuccess={onClose} />
      </div>
    </div>,
    modalRoot
  );
};

export default NoteModal;