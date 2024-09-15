import { useContext } from "react";
import { SettingsContext } from "@contexts/SettingsContext";

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettingsContext has to be used within <SettingsProvider>"
    );
  }

  return context;
};