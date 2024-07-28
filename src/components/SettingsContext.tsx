import { ReactNode, createContext, useState } from "react";

interface SettingsProviderProps {
  children: ReactNode;
}

interface SettingsContextType {
  deckName: string;
  repeatCard: boolean;
  isSettingsActive: boolean;
  lastSelectedCategory: string;
  setDeckName(value: string): void;
  setRepeatCard(value: boolean): void;
  setIsSettingsActive(value: boolean): void;
  setLastSelectedCategory(id: string): void
}

export const SettingsContext = createContext<SettingsContextType>({
  deckName: "",
  repeatCard: false,
  isSettingsActive: false,
  lastSelectedCategory: "",
  setDeckName: () => { },
  setRepeatCard: () => { },
  setIsSettingsActive: () => { },
  setLastSelectedCategory: () => { },
});

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [deckName, setDeckName] = useState("")
  const [repeatCard, setRepeatCard] = useState(false)
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const [lastSelectedCategory, setLastSelectedCategory] = useState("")

  const value: SettingsContextType = {
    deckName,
    repeatCard,
    isSettingsActive,
    lastSelectedCategory,
    setDeckName,
    setRepeatCard,
    setIsSettingsActive,
    setLastSelectedCategory
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
