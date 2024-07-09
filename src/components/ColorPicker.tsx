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
  defaultColor: string;
  onChange(value: string): void;
}

const SWATCH: SwatchProps[] = [];

// Add selected state to theme colors
COLORS.forEach((color) => {
  SWATCH.push({ ...color, selected: false })
})

// Include a custom color object
SWATCH.push({ label: "Custom color", value: "custom", selected: false })

/**
 * Set selected item in swatch array
 * @param value Initial or default color passed into component
 * @returns Updated array
 */
const setupSwatch = (value: string) => {
  const isInSwatch = SWATCH.some(color => color.value === value);

  const colors = SWATCH.map((color) => {
    const isColor = color.value === value;
    const isCustom = !isInSwatch && color.value === "custom"

    return {
      ...color,
      selected: isColor || isCustom ? true : false
    };
  });

  return colors;
}


export default function ColorPicker({ id, defaultColor, onChange }: ColorPickerProps) {
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const colorPickerLabelRef = useRef<HTMLLabelElement>(null);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [swatch, setSwatch] = useState(setupSwatch(defaultColor));

  const updateSwatch = (value: string) => {
    const updatedColors = swatch.map((color) => {
      return {
        ...color,
        selected: color.value === value ? true : false
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
    updateSwatch("custom");
    setSelectedColor(colorPickerRef.current.value);
  }

  const handleOptionClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    const color = e.currentTarget.dataset.color;

    if (!color) return;

    if (color === "custom") {
      openColorPicker();
      return;
    }

    updateSwatch(color);
    setSelectedColor(color);
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
            onChange={(e) => setSelectedColor(e.target.value)}
            id="select-custom-color"
            type="color"
            defaultValue={defaultColor}
            tabIndex={-1}
          />
        </label>
      </div>
    </div>
  )
}