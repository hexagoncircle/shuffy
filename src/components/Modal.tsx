import { ReactNode, useEffect, useRef } from "react";
import "@css/Modal.css";

interface ModalProps {
  open: boolean;
  close(): void;
  children: ReactNode;
}

export default function Modal({ open, close, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  return (
    <dialog ref={ref} onCancel={close}>
      {children}
    </dialog>
  );
}
