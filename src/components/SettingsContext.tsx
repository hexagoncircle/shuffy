import { ReactNode, createContext, useState } from "react";

interface SettingsProviderProps {
  children: ReactNode;
}

interface SettingsContextType {
  isSettingsActive: boolean;
  lastSelectedCategory: string;
  setIsSettingsActive(isActive: boolean): void;
  setLastSelectedCategory(categoryId: string): void
}

export const SettingsContext = createContext<SettingsContextType>({
  isSettingsActive: false,
  lastSelectedCategory: "",
  setIsSettingsActive: () => { },
  setLastSelectedCategory: () => { }
});

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const [lastSelectedCategory, setLastSelectedCategory] = useState("")

  const value: SettingsContextType = {
    isSettingsActive,
    lastSelectedCategory,
    setIsSettingsActive,
    setLastSelectedCategory
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
