import { ReactNode, createContext, useState } from "react";

interface SettingsProviderProps {
  children: ReactNode;
}

interface SettingsContextType {
  deckName: string;
  repeatCard: boolean;
  isSettingsActive: boolean;
  lastSelectedCategory: string;
  hasShuffleAnimation: boolean;
  setDeckName(value: string): void;
  setRepeatCard(value: boolean): void;
  setIsSettingsActive(value: boolean): void;
  setLastSelectedCategory(id: string): void;
  setHasShuffleAnimation(value: boolean): void;
}

export const SettingsContext = createContext<SettingsContextType>({
  deckName: "",
  repeatCard: false,
  isSettingsActive: false,
  lastSelectedCategory: "",
  hasShuffleAnimation: true,
  setDeckName: () => { },
  setRepeatCard: () => { },
  setIsSettingsActive: () => { },
  setLastSelectedCategory: () => { },
  setHasShuffleAnimation: () => { },
});

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [deckName, setDeckName] = useState("")
  const [repeatCard, setRepeatCard] = useState(false)
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const [hasShuffleAnimation, setHasShuffleAnimation] = useState(true)
  const [lastSelectedCategory, setLastSelectedCategory] = useState("")

  const value: SettingsContextType = {
    deckName,
    repeatCard,
    isSettingsActive,
    lastSelectedCategory,
    hasShuffleAnimation: hasShuffleAnimation,
    setDeckName,
    setRepeatCard,
    setIsSettingsActive,
    setLastSelectedCategory,
    setHasShuffleAnimation: setHasShuffleAnimation
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
