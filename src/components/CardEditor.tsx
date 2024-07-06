interface CardEditorProps {
  category: string;
  name: string;
}

export default function CardEditor({ category, name }: CardEditorProps) {
  return (
    <article className="card card-editor">
      {category && <div className="card-category">{category}</div>}
      <div className="editor-box">
        <div className="editor-box-corner"></div>
        <div className="editor-box-corner"></div>
        <div className="editor-box-corner"></div>
        <div className="editor-box-corner"></div>
        <h2 className="card-name">{name}</h2>
      </div>
    </article>
  );
}
