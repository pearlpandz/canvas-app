// Form Component for Element Properties
const CanvasElementForm = ({ element, onChange }) => {
  const updateValue = (field, value) => {
    onChange({ ...element, [field]: value });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <label>
        Font Size:
        <input
          type="number"
          value={element.fontSize}
          min="12"
          onChange={(e) => updateValue("fontSize", parseInt(e.target.value))}
        />
      </label>

      <label>
        Width:
        <input
          type="number"
          value={element.width}
          onChange={(e) => updateValue("width", parseInt(e.target.value))}
        />
      </label>

      <label>
        Height:
        <input
          type="number"
          value={element.height}
          onChange={(e) => updateValue("height", parseInt(e.target.value))}
        />
      </label>

      <label>
        Radius:
        <input
          type="number"
          value={element.radius}
          onChange={(e) => updateValue("radius", parseInt(e.target.value))}
        />
      </label>

      

      <label>
        Background Color:
        <input
          type="color"
          value={element.color}
          onChange={(e) => updateValue("color", e.target.value)}
        />
      </label>

      <label>
        Text Color:
        <input
          type="color"
          value={element.textColor}
          onChange={(e) => updateValue("textColor", e.target.value)}
        />
      </label>

      <label>
        Border Radius:
        <input
          type="number"
          value={element.borderRadius}
          onChange={(e) => updateValue("borderRadius", parseInt(e.target.value))}
        />
      </label>

      <label>
        Slug:
        <input
          value={element.slug}
          onChange={(e) => updateValue("slug", e.target.value)}
        />
      </label>
    </div>
  );
};

export default CanvasElementForm;