import { useContext } from "react";
import { ConfirmModalContext } from "@contexts/ConfirmModalContext";

export const useConfirmModalContext = () => {
  const context = useContext(ConfirmModalContext);

  if (!context) {
    throw new Error(
      "useConfirmModalContext has to be used within <ConfirmModalProvider>"
    );
  }

  return context;
};