export type ToastType = 'success' | 'info' | 'error';

export interface ToastProps {
  message: string;
  type?: ToastType;
  onClose?: () => void;
}