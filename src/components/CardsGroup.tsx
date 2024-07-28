import { useEffect, useRef, useId, ChangeEvent, useContext } from 'react';
import { getItemById } from '@js/utils';
import { CardDataProps, CardsContext } from '@components/CardsContext';
import CardChip from '@components/CardChip';

interface CardsGroupProps {
  category: string;
  cards: CardDataProps[];
  focusIndex?: number;
  onCardClick(id: string, index: number): void;
}

export default function CardsGroup({ focusIndex, category, cards, onCardClick }: CardsGroupProps) {
  const id = useId();
  const { updateCard } = useContext(CardsContext);
  const parentRef = useRef<HTMLInputElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const allChecked = cards.every(card => card.isActive);
  const someChecked = cards.some(card => card.isActive);

  const handleGroupChange = (e: ChangeEvent<HTMLInputElement>) => {
    cards.forEach(card => {
      updateCard({
        ...card,
        isActive: e.target.checked
      });
    })
  };

  const handleCardChange = (id: string) => {
    const card = getItemById(cards, id);

    if (!card) return;

    updateCard({
      ...card,
      isActive: !card.isActive
    });
  };

  const handleCardClick = (id: string, index: number) => {
    onCardClick(id, index);
  }

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.indeterminate = someChecked && !allChecked;
    }
  }, [cards, allChecked, someChecked]);

  useEffect(() => {
    if (focusIndex !== undefined) {
      // Refocus selected card
      cardsRef.current[focusIndex]?.focus();
    }
  }, [focusIndex])

  return (
    <ul className="flow" role="list">
      <li className="flow flow-m">
        <div className="checkbox-wrapper break-words">
          <input
            ref={parentRef}
            id={`${id}-group-active-toggle`}
            type="checkbox"
            onChange={handleGroupChange}
            checked={allChecked}
          />
          <label htmlFor={`${id}-group-active-toggle`}>{category}</label>
        </div>

        <ul className="flow flow-s" role="list">
          {cards.map(({ label, isActive, id }, index) => (
            <li key={id}>
              <CardChip
                ref={el => (cardsRef.current[index] = el)}
                id={id}
                label={label}
                isActive={isActive}
                onClick={() => handleCardClick(id, index)}
                onActiveChange={() => handleCardChange(id)}
              />
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}