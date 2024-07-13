import { useEffect, useRef, useId, ChangeEvent, useContext, CSSProperties } from 'react';
import { CardDataProps, CardsContext } from './CardsContext';
import { getItemById } from '@js/utils';
import Chip from './Chip';

interface ChipGroupProps {
  category: string;
  cards: CardDataProps[]
  onCardClick(id: string): void;
}

export default function ChipGroup({ category, cards, onCardClick }: ChipGroupProps) {
  const id = useId();
  const { updateCard } = useContext(CardsContext);
  const parentRef = useRef<HTMLInputElement>(null);
  const allChecked = cards.every(({ isActive }) => isActive);
  const someChecked = cards.some(card => card.isActive);

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.indeterminate = someChecked && !allChecked;
    }
  }, [cards, allChecked, someChecked]);

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

  return (
    <ul className="flow" role="list">
      <li className="flow flow-m">
        <div className="checkbox-wrapper">
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
          {cards.map(({ label, isActive, id }) => (
            <li key={id}>
              <Chip
                label={label}
                isActive={isActive}
                onClick={() => onCardClick(id)}
                onActiveChange={() => handleCardChange(id)}
              />
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}