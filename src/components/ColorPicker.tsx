import "@css/color-picker.css";
import { CSSProperties, SyntheticEvent, useEffect, useRef, useState } from "react";
import ShuffyFace from "@assets/color-picker-face.svg?react";
import COLORS from "@data/colors.theme.json";

interface ColorDataProps {
  label: string;
  value: string;
}

interface SwatchProps extends ColorDataProps {
  selected: boolean;
}

interface ColorPickerProps {
  id?: string;
  onChange(selectedColor: string): void;
}

const SWATCH: SwatchProps[] = [];

// Add selected state to theme colors
COLORS.forEach((color, i) => {
  SWATCH.push({ ...color, selected: i === 0 ? true : false })
})

// Add custom color
SWATCH.push({ label: "Custom color", value: "custom", selected: false })

export default function ColorPicker({ id, onChange }: ColorPickerProps) {
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const colorPickerLabelRef = useRef<HTMLLabelElement>(null);
  const [swatch, setSwatch] = useState(SWATCH);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [isColorPickerActive, setIsColorPickerActive] = useState(false);

  const updateColors = (selectedColor: string) => {
    const updatedColors = swatch.map((color) => {
      return {
        ...color,
        selected: color.value === selectedColor ? true : false
      };
    });

    setIsColorPickerActive(false);
    setSelectedColor(selectedColor);
    setSwatch(updatedColors);
  }

  const selectCustomColor = () => {
    const updatedColors = swatch.map((color) => {
      return {
        ...color,
        selected: color.value === "custom" ? true : false
      };
    });

    setSwatch(updatedColors);
  }

  const openColorPicker = () => {
    /**
     * click() not opening native color picker in iOS Safari
     * Workaround: Call click on label element instead ¯\_(ツ)_/¯
     */
    if (!colorPickerRef.current || !colorPickerLabelRef.current) return;

    colorPickerLabelRef.current.click();
    selectCustomColor();
    setSelectedColor(colorPickerRef.current.value);
  }

  const handleColorPickerInput = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setSelectedColor(target.value);
  }

  const handleOptionClick = (e: SyntheticEvent) => {
    const target = e.target as HTMLButtonElement;

    if (target.dataset.color === "custom") {
      if (isColorPickerActive) return;
      openColorPicker();
      return;
    }

    const selectedColor = target.dataset.color;

    selectedColor && updateColors(selectedColor);
  }

  useEffect(() => {
    onChange(selectedColor);
  }, [selectedColor, onChange])

  return (
    <div id={id} className="color-picker">
      <figure className="color-picker-face" style={{ "--theme": selectedColor } as CSSProperties}>
        <ShuffyFace />
      </figure>

      <div className="color-picker-swatch">
        {swatch.map(({ value, label, selected }) => (
          <button
            key={value}
            data-color={value}
            className="color-picker-option"
            style={{ "--color": value } as CSSProperties}
            type="button"
            aria-pressed={selected}
            onClick={handleOptionClick}
          >
            <span className="visually-hidden">{label}</span>
          </button>
        ))}

        <label ref={colorPickerLabelRef} className="color-picker-option color-picker-input-label">
          <span className="visually-hidden">Custom color</span>
          <input
            ref={colorPickerRef}
            onChange={handleColorPickerInput}
            id="select-custom-color"
            type="color"
            defaultValue="#8AE0E0"
            tabIndex={-1}
          />
        </label>
      </div>
    </div>
  )
}