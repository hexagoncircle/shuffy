import { ViewTransition } from "react";
import CloseIcon from "@assets/close.svg?react";
import { VIEW_TRANSITIONS } from "@js/constants";

interface DeckEditHeaderProps {
  text: string;
  onClose?(): void;
}

export default function DeckEditHeader({ text, onClose }: DeckEditHeaderProps) {
  return (
    <ViewTransition
      enter={VIEW_TRANSITIONS.screen}
      exit={VIEW_TRANSITIONS.screen}
    >
      <header className="deck-header deck-edit-header">
        <h1 className="deck-edit-header-text center">{text}</h1>
        {onClose ? (
          <div className="deck-edit-header-action">
            <button className="icon-button border-0" onClick={() => onClose()}>
              <span className="visually-hidden">Cancel action</span>
              <CloseIcon aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </header>
    </ViewTransition>
  );
}
