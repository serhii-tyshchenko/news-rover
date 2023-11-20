export type TDialogProps = {
  opened: boolean;
  title?: string;
  closeBtnTitle?: string;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
};
