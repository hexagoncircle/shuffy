import CloseIcon from "@assets/close.svg?react";
import { ReactNode, useEffect, useRef } from "react";
import "@css/modal.css";
import { useClickAway } from "@uidotdev/usehooks";

interface ModalProps {
  open: boolean;
  onClose(): void;
  actions?: ReactNode;
  children: ReactNode;
}

export default function Modal({ open, actions, children, onClose }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const formRef = useClickAway<HTMLFormElement>(() => onClose());

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
    <dialog ref={ref} className="modal" onClose={() => onClose()}>
      <form ref={formRef} method="dialog">
        <header className="modal-header">
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