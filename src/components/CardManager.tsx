import CardCreator from "@components/CardCreator";
import CardEditor from "@components/CardEditor";
import { CardDataProps } from "./CardsContext";

interface CardManagerProps {
  card?: CardDataProps;
  onEditComplete(): void;
  onAddComplete(value?: string): void;
}

export default function CardManager({ card, onEditComplete, onAddComplete }: CardManagerProps) {
  return card ? (
    <CardEditor card={card} onComplete={onEditComplete} />
  ) : (
    <CardCreator onComplete={onAddComplete} />
  );
}