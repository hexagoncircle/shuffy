import { useContext } from "react"
import { ConfirmModalContext, ConfirmModalState } from "@contexts/ConfirmModalContext";
import Modal from "./Modal";

export default function ConfirmModal() {
  const { modalContext, setModalContext } = useContext(ConfirmModalContext);
  const {
    title,
    message,
    actionConfirmText,
    actionCancelText,
    isOpen,
    onConfirm,
  } = modalContext;

  const handleClose = () => {
    setModalContext((prev: ConfirmModalState) => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} actions={(
      <>
        <button className="primary" onClick={handleConfirm}>
          {actionConfirmText}
        </button>
        <button onClick={handleClose}>{actionCancelText}</button>
      </>
    )}>
      <div className="flow text-center">
        <h2 className="text-2xl">{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: message }}></p>
      </div>
    </Modal>
  )
}