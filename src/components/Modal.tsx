import CloseIcon from "@assets/close.svg?react";
import { ReactNode, useEffect, useRef } from "react";
import "@css/modal.css";

interface ModalProps {
  open: boolean;
  onClose(): void;
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  variant?: "modal" | "drawer";
}

export default function Modal({ open, actions, title, variant, children, onClose }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.removeAttribute('inert');
      ref.current?.showModal();
    } else {
      ref.current?.setAttribute('inert', '');
      ref.current?.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="modal"
      data-variant={variant}
      onClose={() => onClose()}
    >
      <form method="dialog">
        <header className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button className="modal-close icon-button" onClick={() => onClose()}>
            <span className="visually-hidden">Close</span>
            <CloseIcon aria-hidden="true" />
          </button>
        </header>
        <article className="modal-content">
          {children}
        </article>
        {actions && (
          <footer className="modal-actions center">
            {actions}
          </footer>
        )}
      </form>
    </dialog>
  )
}