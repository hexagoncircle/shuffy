import { ReactNode, createContext, useState } from "react";

interface SettingsProviderProps {
  children: ReactNode;
}

interface SettingsContextType {
  deckName: string;
  repeatCard: boolean;
  isSettingsActive: boolean;
  lastSelectedCategory: string;
  shuffleAnimation: boolean;
  setDeckName(value: string): void;
  setRepeatCard(value: boolean): void;
  setIsSettingsActive(value: boolean): void;
  setLastSelectedCategory(id: string): void;
  setShuffleAnimation(value: boolean): void;
}

export const SettingsContext = createContext<SettingsContextType>({
  deckName: "",
  repeatCard: false,
  isSettingsActive: false,
  lastSelectedCategory: "",
  shuffleAnimation: true,
  setDeckName: () => { },
  setRepeatCard: () => { },
  setIsSettingsActive: () => { },
  setLastSelectedCategory: () => { },
  setShuffleAnimation: () => { },
});

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [deckName, setDeckName] = useState("")
  const [repeatCard, setRepeatCard] = useState(false)
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const [shuffleAnimation, setShuffleAnimation] = useState(true)
  const [lastSelectedCategory, setLastSelectedCategory] = useState("")

  const value: SettingsContextType = {
    deckName,
    repeatCard,
    isSettingsActive,
    lastSelectedCategory,
    shuffleAnimation,
    setDeckName,
    setRepeatCard,
    setIsSettingsActive,
    setLastSelectedCategory,
    setShuffleAnimation
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
