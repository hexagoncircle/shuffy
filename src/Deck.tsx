import { useState, ViewTransition, startTransition } from "react";
import ConfirmModalProvider from "@contexts/ConfirmModalContext";
import { useCardsContext } from "@hooks/useCardsContext";
import DeckDisplay from "@components/DeckDisplay";
import ConfirmModal from "@components/ConfirmModal";
import SettingsModal from "@components/SettingsModal";
import DeckHeader from "@components/DeckHeader";
import DeckEditHeader from "@components/DeckEditHeader";
import { CardEditAction } from "@components/CardEditor";
import "@css/deck.css"

export default function Deck() {
  const { setEditCardId } = useCardsContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editAction, setEditAction] = useState("");

  const handleIsEditing = (isEditing: boolean, action: CardEditAction) => {
    startTransition(() => {
      setIsEditing(isEditing);
      setEditAction(action);
    })
  }

  const handleClose = () => {
    startTransition(() => {
      setEditCardId("");
      setIsEditing(false)
    })
  }

  return (
    <ConfirmModalProvider>
      <ViewTransition update="screen-transition">
        {isEditing ? (
          <DeckEditHeader
            text={editAction === "create" ? "Add new card" : "Modify card"}
            onClose={handleClose}
          />
        ) : <DeckHeader />}
        <main className="deck-display">
          <DeckDisplay isEditing={isEditing} onIsEditing={handleIsEditing} />
        </main>
      </ViewTransition>
      <ConfirmModal />
      <SettingsModal />
    </ConfirmModalProvider>
  )
}