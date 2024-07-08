import { ReactNode, createContext, useState } from "react";

interface SettingsProviderProps {
  children: ReactNode;
}

interface SettingsContextType {
  isSettingsActive: boolean;
  setIsSettingsActive(value: boolean): void;
}

export const SettingsContext = createContext<SettingsContextType>({
  isSettingsActive: false,
  setIsSettingsActive: () => { }
});

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [isSettingsActive, setIsSettingsActive] = useState(false)

  const value: SettingsContextType = {
    isSettingsActive,
    setIsSettingsActive
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
