import { useState } from "react";
import DeckDisplay from "@components/DeckDisplay";
import ConfirmModal from "@components/ConfirmModal";
import ConfirmModalProvider from "@components/ConfirmModalContext";
import SettingsModal from "@components/SettingsModal";
import DeckHeader from "@components/DeckHeader";
import DeckEditHeader from "@components/DeckEditHeader";
import "@css/deck.css"
import { CardEditAction } from "@components/CardEditor";

export default function Deck() {
  const [isEditing, setIsEditing] = useState(false);
  const [editAction, setEditAction] = useState("");

  const handleIsEditing = (isEditing: boolean, action: CardEditAction) => {
    setIsEditing(isEditing);
    setEditAction(action);
  }

  return (
    <ConfirmModalProvider>
      {isEditing ? (
        <DeckEditHeader
          text={editAction === "add" ? "Add new card" : "Modify card"}
          onClose={() => setIsEditing(false)}
        />
      ) : <DeckHeader />}
      <main className="deck flow">
        <DeckDisplay isEditing={isEditing} onIsEditing={handleIsEditing} />
        <ConfirmModal />
        <SettingsModal />
      </main>
    </ConfirmModalProvider>
  )
}