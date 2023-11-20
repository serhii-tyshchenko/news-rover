export type TDialogProps = {
  title?: string;
  closeBtnTitle?: string;
  cancelBtnTitle?: string;
  confirmBtnTitle?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
  className?: string;
};
