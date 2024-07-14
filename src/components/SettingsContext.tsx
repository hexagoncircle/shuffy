import { ReactNode, createContext, useState } from "react";

interface SettingsProviderProps {
  children: ReactNode;
}

interface SettingsContextType {
  repeatCard: boolean;
  isSettingsActive: boolean;
  lastSelectedCategory: string;
  setRepeatCard(value: boolean): void;
  setIsSettingsActive(value: boolean): void;
  setLastSelectedCategory(id: string): void
}

export const SettingsContext = createContext<SettingsContextType>({
  repeatCard: false,
  isSettingsActive: false,
  lastSelectedCategory: "",
  setRepeatCard: () => { },
  setIsSettingsActive: () => { },
  setLastSelectedCategory: () => { }
});

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [repeatCard, setRepeatCard] = useState(false)
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const [lastSelectedCategory, setLastSelectedCategory] = useState("")

  const value: SettingsContextType = {
    repeatCard,
    isSettingsActive,
    lastSelectedCategory,
    setRepeatCard,
    setIsSettingsActive,
    setLastSelectedCategory
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
