import {
  CSSProperties,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import ShuffyFace from "@assets/color-picker-face.svg?react";
import COLORS from "@data/colors.theme.json";
import "@css/color-picker.css";
import { useRovingFocus } from "@hooks/useRovingFocus";
import mergeRefs from "merge-refs";

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
  SWATCH.push({ ...color, selected: false });
});

// Include a custom color object
SWATCH.push({ label: "Custom color", value: "custom", selected: false });

/**
 * Set selected item in swatch array
 * @param value Initial or default color passed into component
 * @returns Updated array
 */
const setupSwatch = (value: string) => {
  const isInSwatch = SWATCH.some((color) => color.value === value);

  const colors = SWATCH.map((color) => {
    const isColor = color.value === value;
    const isCustom = !isInSwatch && color.value === "custom";

    return {
      ...color,
      selected: isColor || isCustom ? true : false,
    };
  });

  return colors;
};

/**
 * Get the initial swatch color from the default color
 * @param value Initial or default color passed into component
 * @returns Index of the matching swatch color or custom color index if not found
 */
const getInitialSwatchColorIndex = (value: string) => {
  const index = SWATCH.findIndex((color) => color.value === value);
  return index !== -1 ? index : SWATCH.length - 1;
};

export default function ColorPicker({
  id,
  defaultColor,
  onChange,
}: ColorPickerProps) {
  const swatchRef = useRef(null);
  const colorsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const colorPickerLabelRef = useRef<HTMLLabelElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(() =>
    getInitialSwatchColorIndex(defaultColor)
  );
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [swatch, setSwatch] = useState(setupSwatch(defaultColor));
  const {
    rovingFocusContainerRef,
    rovingFocusOnKeyDown,
    rovingFocusItemProps,
  } = useRovingFocus<HTMLDivElement>({ initialIndex: selectedIndex });

  const updateSwatch = (value: string) => {
    const updatedColors = swatch.map((color) => {
      return {
        ...color,
        selected: color.value === value ? true : false,
      };
    });

    setSwatch(updatedColors);
  };

  const openColorPicker = () => {
    /**
     * click() not opening native color picker in iOS Safari
     * Workaround: Call click on label element instead ¯\_(ツ)_/¯
     */
    if (!colorPickerRef.current || !colorPickerLabelRef.current) return;

    colorPickerLabelRef.current.click();
    updateSwatch("custom");
    setSelectedColor(colorPickerRef.current.value);
  };

  const handleOptionClick = (
    e: SyntheticEvent<HTMLButtonElement>,
    index: number
  ) => {
    const color = e.currentTarget.dataset.color;

    if (!color) return;

    setSelectedIndex(index);

    if (color === "custom") {
      openColorPicker();
      return;
    }

    updateSwatch(color);
    setSelectedColor(color);
  };

  useEffect(() => {
    onChange(selectedColor);
  }, [selectedColor, onChange]);

  useEffect(() => {
    if (!colorsRef.current) return;

    /**
     * On mount, set the default color element to handle roving focus.
     * If no color matches, focus the custom color element.
     */
    const index = colorsRef.current.findIndex(
      (item) => item?.getAttribute("data-color") === defaultColor
    );

    setSelectedIndex(index !== -1 ? index : colorsRef.current.length - 1);
  }, [defaultColor]);

  return (
    <div id={id} className="color-picker">
      <figure
        className="color-picker-face"
        style={{ "--theme": selectedColor } as CSSProperties}
      >
        <ShuffyFace />
      </figure>
      <div
        ref={mergeRefs(swatchRef, rovingFocusContainerRef)}
        onKeyDown={rovingFocusOnKeyDown}
        className="color-picker-swatch"
      >
        {swatch.map(({ value, label, selected }, index) => (
          <button
            key={value}
            ref={(el) => {
              colorsRef.current[index] = el;
            }}
            data-color={value}
            className="color-picker-option"
            style={{ "--color": value } as CSSProperties}
            type="button"
            aria-pressed={selected}
            onClick={(e) => handleOptionClick(e, index)}
            {...rovingFocusItemProps}
          >
            <span className="visually-hidden">{label}</span>
          </button>
        ))}

        <label
          ref={colorPickerLabelRef}
          className="color-picker-option color-picker-input-label"
        >
          <span className="visually-hidden">Custom color</span>
          <input
            ref={colorPickerRef}
            onChange={(e) => setSelectedColor(e.target.value)}
            id="select-custom-color"
            type="color"
            defaultValue={defaultColor}
            data-no-roving
            tabIndex={-1}
          />
        </label>
      </div>
    </div>
  );
}
