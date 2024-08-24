import { useContext, useState } from "react";
import DeckDisplay from "@components/DeckDisplay";
import ConfirmModal from "@components/ConfirmModal";
import ConfirmModalProvider from "@components/ConfirmModalContext";
import SettingsModal from "@components/SettingsModal";
import DeckHeader from "@components/DeckHeader";
import DeckEditHeader from "@components/DeckEditHeader";
import { CardEditAction } from "@components/CardEditor";
import { CardsContext } from "@components/CardsContext";
import "@css/deck.css"

export default function Deck() {
  const { setEditCardId } = useContext(CardsContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editAction, setEditAction] = useState("");

  const handleIsEditing = (isEditing: boolean, action: CardEditAction) => {
    setIsEditing(isEditing);
    setEditAction(action);
  }

  const handleClose = () => {
    setEditCardId("");
    setIsEditing(false)
  }

  return (
    <ConfirmModalProvider>
      {isEditing ? (
        <DeckEditHeader
          text={editAction === "add" ? "Add new card" : "Modify card"}
          onClose={handleClose}
        />
      ) : <DeckHeader />}
      <main className="deck-display">
        <DeckDisplay isEditing={isEditing} onIsEditing={handleIsEditing} />
      </main>
      <ConfirmModal />
      <SettingsModal />
    </ConfirmModalProvider>
  )
}