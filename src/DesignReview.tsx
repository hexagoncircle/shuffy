import { CSSProperties, ChangeEvent, useEffect, useRef } from "react";
import slugify from "slugify";
import "@css/ds.css";
import Select from "./components/Select";
import Switch from "./components/Switch";
import TrashIcon from "@assets/trash.svg?react";
import PlusIcon from "@assets/close.svg?react";
import Card from "./components/Card";
import CARDS from "@data/cards.json";
import CATEGORIES from "@data/categories.json";
import COLORS from "@data/colors.app.json";
import Category from "./components/Category";
import ColorPicker from "./components/ColorPicker";
import CardStarter from "./components/CardStarter";
import CategoryStarter from "./components/CategoryStarter";

const SELECT_OPTIONS = [
  {
    value: "",
    label: "Select a category",
    disabled: true,
  },
  ...CATEGORIES
]

export default function DesignReview() {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!checkboxRef.current) return;
    checkboxRef.current.indeterminate = true
  }, [])

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(`${e.target.id}:`, e.target.value)
  }

  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(`${e.target.id}:`, e.target.checked)
  }

  const handleColorPickerChange = (color: string) => {
    console.log("Color picker change", color)
  }

  return (
    <main className="page center">
      <article className="page-section flow">
        <h2 className="section-title">Colors</h2>
        <ul className="color-squares | grid" role="list">
          {COLORS.map(color => (
            <li key={color} className="box" style={{ "--color": `var(--${slugify(color, { lower: true })})` } as CSSProperties}>
              <div className="color-square"></div>
              <span>{color}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="page-section flow">
        <h2 className="section-title">Typography</h2>
        <div className="text-2xl font-bold">2x-large</div>
        <div className="text-xl font-bold">x-large</div>
        <div className="text-l font-semibold">large</div>
        <div className="text-m">medium</div>
        <div className="text-s">small</div>
        <div className="text-xs">x-small</div>
        <p>Paragraph — Lorem, <strong>ipsum dolor</strong> sit amet consectetur <em>adipisicing elit</em>. Inventore fugiat aliquam vero <a href="#">exercitationem</a> aperiam <s>possimus</s> amet minus qui beatae, repellendus nobis soluta quae! Nostrum, fugiat quas odio adipisci sit ducimus!</p>
        <ul>
          <li>Absolutely stunning</li>
          <li>Brilliant and totally fresh</li>
          <li>Down right delightful</li>
        </ul>
        <ol>
          <li>Crack a few eggs.</li>
          <li>Mix ingredients in a large bowl.</li>
          <li>Bake!</li>
        </ol>
      </article>

      <article className="page-section flow flow-xl">
        <h2 className="section-title">Form inputs</h2>
        <section className="flow" style={{ maxInlineSize: "22rem" }}>
          <div>
            <label htmlFor="input-1" className="visually-hidden">Enter deck name</label>
            <input id="input-1" className="text-center" type="text" placeholder="Enter a name for your deck" />
          </div>
          <div>
            <label htmlFor="input-2">Deck name</label>
            <input id="input-2" type="text" defaultValue="Creative Time" />
          </div>
          <div>
            <label htmlFor="input-3" className="visually-hidden">Compact variant</label>
            <input className="compact" id="input-3" type="text" placeholder="Enter a category title..." />
          </div>
          <div>
            <label htmlFor="select-category" className="visually-hidden">Category</label>
            <Select id="select-category" onChange={handleSelectChange} options={SELECT_OPTIONS} selected={SELECT_OPTIONS[0]} />
          </div>
        </section>

        <section className="cluster">
          <div className="cluster" style={{ "--align": "center", "--gap": "var(--space-xs)" } as CSSProperties}>
            <input id="checkbox-1" type="checkbox" />
            <label htmlFor="checkbox-1">Initial state</label>
          </div>
          <div className="cluster" style={{ "--align": "center", "--gap": "var(--space-xs)" } as CSSProperties}>
            <input id="checkbox-2" type="checkbox" defaultChecked />
            <label htmlFor="checkbox-2">Checked</label>
          </div>
          <div className="cluster" style={{ "--align": "center", "--gap": "var(--space-xs)" } as CSSProperties}>
            <input ref={checkboxRef} id="checkbox-3" type="checkbox" />
            <label htmlFor="checkbox-3">Indeterminate</label>
          </div>
        </section>

        <section className="cluster">
          <label htmlFor="color-picker" className="visually-hidden">Color picker</label>
          <ColorPicker id="color-picker" onChange={handleColorPickerChange} />
        </section>
      </article>

      <article className="page-section flow">
        <h2 className="section-title">Buttons</h2>
        <section className="cluster" style={{ "--align": "center" } as CSSProperties}>
          <button>Default</button>
          <button className="primary">Primary</button>
          <button className="action">Action</button>
          <button className="danger">Danger</button>
          <button disabled>Disabled</button>
          <button className="primary">
            <TrashIcon />
            With icon
          </button>
          <button className="primary small">
            <PlusIcon />
            Small with icon
          </button>
          <button className="action raised">Raised action</button>
          <button className="action raised large">Large raised action</button>
          <button className="icon-button action raised large">
            <span className="visually-hidden">Add</span>
            <PlusIcon />
          </button>
        </section>
      </article>

      <article className="page-section flow">
        <h2 className="section-title">Actions</h2>
        <section className="actions">
          <button className="raised action">Add card to deck</button>
          <button>Cancel</button>
        </section>

        <section className="actions">
          <button className="raised action" disabled>Add card to deck</button>
          <button>Cancel</button>
        </section>

        <section className="actions">
          <button className="raised action large">Shuffy this deck</button>
        </section>
      </article>

      <article className="page-section flow">
        <h2 className="section-title">Switches</h2>
        <section className="flow">
          <div>
            <Switch id="switch-1" onChange={handleSwitchChange} />
            <label htmlFor="switch-1" className="visually-hidden">Switch 1</label>
          </div>
          <div>
            <Switch id="switch-2" checked onChange={handleSwitchChange} />
            <label htmlFor="switch-2" className="visually-hidden">Switch 2</label>
          </div>
          <div>
            <Switch id="switch-3" variant="compact" onChange={handleSwitchChange} />
            <label htmlFor="switch-3" className="visually-hidden">Switch 3</label>
          </div>
          <div>
            <Switch id="switch-4" variant="compact" checked onChange={handleSwitchChange} />
            <label htmlFor="switch-4" className="visually-hidden">Switch 4</label>
          </div>
        </section>
      </article>

      <article className="page-section flow">
        <h2 className="section-title">Cards</h2>
        <div className="cluster">
          {CARDS.map((card) => (
            <Card key={card.id} card={card} />
          ))}
          <CardStarter />
        </div>
      </article>

      <article className="page-section flow">
        <h2 className="section-title">Category</h2>
        <section style={{ maxInlineSize: "25rem" }}>
          <ul className="flow flow-xs" role="list">
            {CATEGORIES.map((category) => (
              <li key={category.value}>
                <Category category={category} />
              </li>
            ))}
          </ul>
          <CategoryStarter />
        </section>
      </article>
    </main>
  )
}