import CardCreator from "@components/CardCreator";
import CardEditor from "@components/CardEditor";
import { CardDataProps } from "./CardsContext";
import { getItemById } from "@js/utils";

interface CardManagerProps {
  card?: CardDataProps;
  onEditComplete(): void;
  onAddComplete(): void;
}

export default function CardManager({ card, onEditComplete, onAddComplete }: CardManagerProps) {
  return card ? (
    <CardEditor card={card} onComplete={onEditComplete} />
  ) : (
    <CardCreator onComplete={onAddComplete} />
  );
}