import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface ConfirmModalProviderProps {
  children: ReactNode;
}

export interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  actionConfirmText?: string;
  actionCancelText?: string;
  onConfirm: () => void;
}

interface ConfirmModalContextType {
  modalContext: ConfirmModalState;
  setModalContext: Dispatch<SetStateAction<ConfirmModalState>>;
}

export const ConfirmModalContext = createContext<ConfirmModalContextType>({
  modalContext: {
    isOpen: false,
    title: "",
    message: "",
    actionConfirmText: "Confirm",
    actionCancelText: "Cancel",
    onConfirm: () => { },
  },
  setModalContext: () => { }
});

export default function ConfirmModalProvider({ children }: ConfirmModalProviderProps) {
  const [modalContext, setModalContext] = useState<ConfirmModalState>({
    isOpen: false,
    title: "",
    message: "",
    actionConfirmText: "Confirm",
    actionCancelText: "Cancel",
    onConfirm: () => { },
  });

  const value = {
    modalContext,
    setModalContext
  }

  return (
    <ConfirmModalContext.Provider value={value}>
      {children}
    </ConfirmModalContext.Provider>
  )
}