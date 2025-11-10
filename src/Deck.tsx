import {
  useState,
  ViewTransition,
  startTransition,
  useRef,
  useEffect,
} from "react";
import ConfirmModalProvider from "@contexts/ConfirmModalContext";
import { useCardsContext } from "@hooks/useCardsContext";
import DeckDisplay from "@components/DeckDisplay";
import ConfirmModal from "@components/ConfirmModal";
import SettingsModal from "@components/SettingsModal";
import DeckHeader from "@components/DeckHeader";
import DeckEditHeader from "@components/DeckEditHeader";
import { CardEditAction } from "@components/CardEditor";
import "@css/deck.css";
import { VIEW_TRANSITIONS } from "@js/constants";

export default function Deck() {
  const { setEditCardId } = useCardsContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editAction, setEditAction] = useState("");
  const isInitialMount = useRef(true);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  const handleIsEditing = (isEditing: boolean, action: CardEditAction) => {
    startTransition(() => {
      setIsEditing(isEditing);
      setEditAction(action);
    });
  };

  const handleClose = () => {
    startTransition(() => {
      setIsEditing(false);
      setEditCardId("");
    });
  };

  return (
    <ConfirmModalProvider>
      <ViewTransition
        default={
          isInitialMount.current
            ? VIEW_TRANSITIONS.none
            : VIEW_TRANSITIONS.screen
        }
        update={{
          [VIEW_TRANSITIONS.none]: VIEW_TRANSITIONS.none,
        }}
      >
        {isEditing ? (
          <DeckEditHeader
            text={editAction === "create" ? "Add new card" : "Modify card"}
            onClose={handleClose}
          />
        ) : (
          <DeckHeader />
        )}
        <main className="deck-display">
          <DeckDisplay isEditing={isEditing} onIsEditing={handleIsEditing} />
        </main>
      </ViewTransition>
      <ConfirmModal />
      <SettingsModal />
    </ConfirmModalProvider>
  );
}
