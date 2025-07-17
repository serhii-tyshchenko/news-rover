import { useEffect, useRef } from 'react';

export function useDialog(opened: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (opened) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [opened]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.stopPropagation();
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return dialogRef;
}
