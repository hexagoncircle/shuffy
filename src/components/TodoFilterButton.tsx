interface TodoFilterButtonProps {
  name: string;
  selected: boolean;
  setFilter(key: string): void;
}

export default function TodoFilterButton({ name, selected, setFilter }: TodoFilterButtonProps) {
  return (
    <button type="button" aria-pressed={selected} onClick={() => setFilter(name)}>
      {name}
    </button>
  );
}
