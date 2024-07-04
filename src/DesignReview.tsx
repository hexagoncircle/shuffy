import { CSSProperties, ChangeEvent } from "react";
import slugify from "slugify";
import "@css/ds.css";
import Select from "./components/Select";
import CATEGORIES from "@data/categories.json";
import COLORS from "@data/colors.json";
import Switch from "./components/Switch";
import TrashIcon from "@assets/trash.svg?react";
import PlusIcon from "@assets/close.svg?react";

const SELECT_OPTIONS = [
  {
    value: "",
    label: "Select a category",
    disabled: true,
  },
  ...CATEGORIES
]

export default function DesignReview() {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(`${e.target.id}:`, e.target.value)
  }

  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(`${e.target.id}:`, e.target.checked)
  }

  return (
    <main className="page center">
      <article className="page-section flow">
        <h2 className="section-title">Cards</h2>

        <section className="cluster">
          <article className="card">
            <div className="card-display">
              <figure className="card-face"></figure>
              <div className="card-category">Music</div>
              <h2 className="card-title">Noodle on the guitar</h2>
            </div>
          </article>

          <article className="card" style={{ "--theme": "purple" } as CSSProperties}>
            <div className="card-display">
              <figure className="card-face"></figure>
              <div className="card-category">Fitness</div>
              <h2 className="card-title">Fit'n this taco in my mouth</h2>
            </div>
          </article>
        </section>
      </article>

      <article className="page-section flow">
        <h2 className="section-title">Buttons</h2>
        <section className="cluster" style={{ "--align": "center" } as CSSProperties}>
          <button>Default</button>
          <button className="primary">Primary</button>
          <button className="danger">Danger</button>
          <button disabled>Disabled</button>
          <button className="action">Action</button>
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
        <h2 className="section-title">Select</h2>
        <label htmlFor="select-category" className="visually-hidden">Select a category</label>
        <Select id="select-category" onChange={handleSelectChange} options={SELECT_OPTIONS} selected={SELECT_OPTIONS[0]} />
      </article>

      <article className="page-section flow">
        <h2 className="section-title">Typography</h2>
        <div className="text-2xl">2x-large</div>
        <div className="text-xl">x-large</div>
        <div className="text-l">large</div>
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

      <article className="page-section flow">
        <h2 className="section-title">Base colors</h2>
        <ul className="color-squares | grid" role="list">
          {COLORS.map(color => (
            <li key={color} className="box" style={{ "--color": `var(--${slugify(color, { lower: true })})` } as CSSProperties}>
              <div className="color-square"></div>
              <span>{color}</span>
            </li>
          ))}
        </ul>
      </article>
    </main>
  )
}