import { Stage, Layer } from "react-konva";
import { useState, useRef, useEffect, useMemo } from "react";
import { useUndoRedo } from "../hook/useUndoRedo";
import CanvasImage from "./CanvasImage";
import CanvasText from "./CanvasText";
import CanvasRectangleWithText from "./CanvasRectangleWithText";
import CanvasRectangle from "./CanvasRectangle";
import CanvasCircle from "./CanvasCircle";
import CanvasElementForm from "./CanvasElementForm";
import CanvasClippedImage from "./CanvasClippedImage";

// Canvas Editor
const CanvasEditor = ({ template, mode = 'edit' }) => {
  const [elements, setElements, undo, redo] = useUndoRedo([]);
  const [selectedId, setSelectedId] = useState(null);
  const [templateName, setTemplateName] = useState('');
  const stageRef = useRef();
  const [templateCategory, setTemplateCategory] = useState('regular');
  
  const dimensions = useMemo(() => {
    if (templateCategory === 'product') {
      return { width: 500, height: 700 }
    } else {
      return { width: 600, height: 600 }
    }
  }, [templateCategory])

  useEffect(() => {
    // Load initial elements from template prop
    if (template?.elements) {
      setElements(template.elements);
      setTemplateName(template.name);
      setTemplateCategory(template.category);
    } else {
      setElements([]);
    }
  }, [template])

  const handleSelect = (id) => setSelectedId(id);

  const handleChange = (newAttrs) => {
    setElements(elements.map(el => (el.id === newAttrs.id ? newAttrs : el)));
  };

  const handleStageClick = (e) => {
    // Deselect if clicking on empty space
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  const bringToFront = () => {
    if (selectedId) {
      const updatedElements = elements.filter(el => el.id !== selectedId);
      const selectedElement = elements.find(el => el.id === selectedId);
      updatedElements.push(selectedElement);
      setElements(updatedElements);
    }
  };

  const sendToBack = () => {
    if (selectedId) {
      const updatedElements = elements.filter(el => el.id !== selectedId);
      const selectedElement = elements.find(el => el.id === selectedId);
      updatedElements.unshift(selectedElement);
      setElements(updatedElements);
    }
  };

  const addTextElement = () => {
    setElements([
      ...elements,
      {
        id: `text-${Date.now()}`,
        type: "text",
        content: "New Text",
        x: 50,
        y: 50,
        fontSize: 14,
        color: "black",
        textAlign: "center",
        slug: "{{text}}"
      }
    ]);
  };

  const addTextBoxElement = () => {
    setElements([
      ...elements,
      {
        id: `text-box-${Date.now()}`,
        type: "text-box",  // ✅ New type for linked Text & Rectangle
        content: "New Text Box",
        x: 50,
        y: 50,
        width: 150, // ✅ Default width for text-box
        height: 50, // ✅ Default height for text-box
        fontSize: 20,
        color: "grey", // ✅ Background color of rectangle
        textColor: "yellow", // ✅ Text color
        slug: "{{text-box}}"
      },
    ]);
  };

  const addImageElement = () => {
    setElements([
      ...elements,
      {
        id: `image-${Date.now()}`,
        type: "image",
        src: "https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg",
        x: 100,
        y: 100,
        width: 150,
        height: 150,
        slug: "{{image}}"
      }
    ]);
  };

  const addRectangle = () => {
    setElements([
      ...elements,
      {
        id: `rect-${Date.now()}`,
        type: "rectangle",
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        color: "#444",
        opacity: 50,
        slug: "{{rect}}"
      }
    ]);
  };

  const addCircle = () => {
    setElements([
      ...elements,
      {
        id: `circle-${Date.now()}`,
        type: "circle",
        x: 200,
        y: 200,
        radius: 50,
        color: "#444",
        opacity: 50,
        slug: "{{circle}}"
      }
    ]);
  };

  const addClipImage = () => {
    setElements([
      ...elements,
      {
        id: `image-${Date.now()}`,
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        src: "https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg",
        radius: 30,
        type: 'clip-image',
        slug: "{{clip-image}}",
        color: '#444',
      },
    ]);
  };

  const saveTemplate = async () => {
    const existingTemplates = JSON.parse(localStorage.getItem('templates')) || [];
    const dataURL = stageRef.current.toDataURL({
      pixelRatio: 0.5 // double resolution
    });
    console.log(dataURL)
    const updatedTemplates = [
      ...existingTemplates,
      {
        name: templateName,
        templateId: existingTemplates.length + 1,
        image: dataURL,
        elements
      }
    ];
    localStorage.setItem('templates', JSON.stringify(updatedTemplates));
    alert("Template saved successfully!");
  };

  const updateTemplate = async () => {
    const existingTemplates = JSON.parse(localStorage.getItem('templates')) || [];
    const templateIndex = existingTemplates.findIndex(t => t.templateId === template?.templateId);
    if (templateIndex === -1) {
      alert("Template not found!");
      return;
    }
    const dataURL = stageRef.current.toDataURL({
      pixelRatio: 1 // double resolution
    });
    const updatedTemplates = [
      ...existingTemplates.filter(t => t.templateId !== template.templateId),
      {
        ...existingTemplates[templateIndex],
        name: templateName,
        image: dataURL,
        elements
      }
    ];
    localStorage.setItem('templates', JSON.stringify(updatedTemplates));
    alert("Template updated successfully!");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result)
      setElements(
        elements.map((el) =>
          el.id === selectedId ? { ...el, src: reader.result } : el
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = (e) => {
    setTemplateCategory(e.target.value)
  }

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Left Side - Canvas */}

      <div className="button-container">
        <button onClick={addTextElement}>Add Text</button>
        <button onClick={addTextBoxElement}>Add Text Box</button>
        <button onClick={addImageElement}>Add Image</button>
        <button onClick={addRectangle}>Add Rectangle</button>
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={addClipImage}>Add Rounded Image</button>

        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        {
          mode === 'edit' ?
            <button onClick={updateTemplate}>Update Template</button> :
            <button onClick={saveTemplate}>Save Template</button>
        }

        <button onClick={bringToFront}>Bring to Front</button>
        <button onClick={sendToBack}>Send to Back</button>

        <label>Replace selected Image</label>
        <input type="file" onChange={handleImageChange} disabled={!selectedId} />

        <label>Template Name</label>
        <input type="text" placeholder="Your template name..." value={templateName || template?.name} onChange={(e) => setTemplateName(e.target.value)} />

        <label>Category</label>
        <select name="category" id="category" value={templateCategory} onChange={handleCategoryChange}>
          <option value="regular">Regular</option>
          <option value="product">Product</option>
          <option value="political">Political</option>
        </select>

        <br />
      </div>

      <div className="canvas-container">
        <Stage
          ref={stageRef}
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={handleStageClick}  // 👈 Click anywhere to deselect
          onTouchStart={handleStageClick} // 👈 Works on touch devices too
        >
          <Layer>
            {elements.map(el => {
              if (el.type === "image") {
                return <CanvasImage key={el.id} element={el} isSelected={el.id === selectedId} onSelect={() => handleSelect(el.id)} onChange={handleChange} />;
              } else if (el.type === "text") {
                return <CanvasText key={el.id} element={el} isSelected={el.id === selectedId} onSelect={() => handleSelect(el.id)} onChange={handleChange} />;
              } else if (el.type === "text-box") {
                return <CanvasRectangleWithText key={el.id} element={el} isSelected={el.id === selectedId} onSelect={() => handleSelect(el.id)} onChange={handleChange} />;
              } else if (el.type === "rectangle") {
                return <CanvasRectangle key={el.id} element={el} isSelected={el.id === selectedId} onSelect={() => handleSelect(el.id)} onChange={handleChange} />;
              } else if (el.type === "circle") {
                return <CanvasCircle key={el.id} element={el} isSelected={el.id === selectedId} onSelect={() => handleSelect(el.id)} onChange={handleChange} />;
              } else if (el.type === "clip-image") {
                return <CanvasClippedImage key={el.id} element={el} isSelected={el.id === selectedId} onSelect={() => handleSelect(el.id)} onChange={handleChange} />
              }
              return null;
            })}
          </Layer>
        </Stage>
      </div >

      {/* Right Side - Form Controls */}
      <div className="form-container">
        <h3>Element Properties</h3>
        {selectedId ? (
          <CanvasElementForm
            element={elements.find((el) => el.id === selectedId)}
            onChange={handleChange}
          />
        ) : (
          <p>Select an element to edit</p>
        )}
      </div>
    </div>
  );
};

export default CanvasEditor;
