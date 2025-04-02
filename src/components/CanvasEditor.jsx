import { Stage, Layer, Text, Image, Rect, Circle, Transformer, Group } from "react-konva";
import { useState, useEffect, useRef } from "react";
import useImage from "use-image";
import { Html } from "react-konva-utils";
import { updateImageUrl } from "../utils";

// Undo-Redo Hook
const useUndoRedo = (initialState) => {
  const [history, setHistory] = useState([initialState]);
  const [index, setIndex] = useState(0);

  const setNewState = (newState) => {
    const newHistory = history.slice(0, index + 1);
    setHistory([...newHistory, newState]);
    setIndex(newHistory.length);
  };

  const undo = () => {
    if (index > 0) setIndex(index - 1);
  };

  const redo = () => {
    if (index < history.length - 1) setIndex(index + 1);
  };

  return [history[index], setNewState, undo, redo];
};

// Reusable Transformer Component
const TransformerComponent = ({ shapeRef, isSelected }) => {
  const transformerRef = useRef();
  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected, shapeRef]);

  return isSelected ? <Transformer ref={transformerRef} /> : null;
};

// Image Component
const CanvasImage = ({ element, isSelected, onSelect, onChange }) => {
  const [image] = useImage(element.src);
  const shapeRef = useRef();

  return (
    <>
      <Image
        ref={shapeRef}
        image={image}
        x={element.x}
        y={element.y}
        width={element.width}
        height={element.height}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const newSrc = updateImageUrl(element.src,  node.width(), node.height())
          onChange({
            ...element,
            x: node.x(),
            y: node.y(),
            width: node.width(),
            height: node.height(),
            scaleX: 1,
            scaleY: 1,
            src: newSrc
          });
        }}
      />
      <TransformerComponent shapeRef={shapeRef} isSelected={isSelected} />
    </>
  );
};

// Text Component
const CanvasText = ({ element, isSelected, onSelect, onChange, stageRef }) => {
  const textNodeRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(element.content);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && stageRef?.current) {
      const textNode = textNodeRef.current;
      const stage = stageRef.current;
      const stageBox = stage.container().getBoundingClientRect();
      const textBox = textNode.getClientRect();

      Object.assign(inputRef.current.style, {
        position: "absolute",
        top: `${stageBox.top + textBox.y}px`,
        left: `${stageBox.left + textBox.x}px`,
        width: `${textBox.width}px`,
        height: `${textBox.height}px`,
        fontSize: `${element.fontSize}px`,
        color: element.color,
        background: "transparent",
        border: "none",
        outline: "none",
        textAlign: "center",
        zIndex: "1000",
      });

      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [element.color, element.fontSize, isEditing, stageRef]);

  const handleDblClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleInputBlur = () => {
    onChange({ ...element, content: text });
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <Html>
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={(e) => e.key === "Enter" && handleInputBlur()}
          />
        </Html>
      ) : (
        <Text
          ref={textNodeRef}
          text={element.content}
          x={element.x}
          y={element.y}
          fontSize={element.fontSize}
          fill={element.color}
          width={element.width > 600 ? 600 : element.width}
          height={element.height > 600 ? 600 : element.height}
          align="center"
          wrap="word"
          draggable
          onClick={onSelect}
          onDblClick={handleDblClick}
          onTap={handleDblClick} // Mobile support
          onTransformEnd={() => {
            const node = textNodeRef.current;
            onChange({
              ...element,
              x: node.x(),
              y: node.y(),
              width: node.width() * node.scaleX() > 600 ? 600 : node.width() * node.scaleX(),
              height: node.height() * node.scaleY() > 600 ? 600 : node.height() * node.scaleY(),
              fontSize: node.fontSize(),
            });
          }}
        />
      )}
      <TransformerComponent shapeRef={textNodeRef} isSelected={isSelected} />
    </>
  );
};

// Rectangle Text Component
const CanvasRectangleWithText = ({ element, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const textRef = useRef();
  const inputRef = useRef();
  const [text, setText] = useState(element.content);
  const [isEditing, setIsEditing] = useState(false);

  const handleDblClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleInputBlur = () => {
    onChange({ ...element, content: text });
    setIsEditing(false);
  };

  return (
    <Group
      x={element.x}
      y={element.y}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        onChange({ ...element, x: e.target.x(), y: e.target.y() });
      }}
    >
      {/* Rectangle */}
      <Rect
        ref={shapeRef}
        width={element.width}
        height={element.height}
        fill={element.color}
        // cornerRadius={5} // it should be parameterize
        draggable={false}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const newWidth = node.width() * node.scaleX();
          const newHeight = node.height() * node.scaleY();
          node.scaleX(1); // Reset scale after applying transformation
          node.scaleY(1);
          onChange({
            ...element,
            width: newWidth,
            height: newHeight
          });
        }}
      />

      {/* Linked Text */}
      {isEditing ? (
        <Html>
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={(e) => e.key === "Enter" && handleInputBlur()}
          />
        </Html>
      ) : (
        <Text
          // x={(shapeRef.current?.width() - textRef.current?.width() + shapeRef.current?.x()) / 2}
          y={shapeRef.current && textRef.current 
            ? shapeRef.current.y() + shapeRef.current.height() - textRef.current.height() 
            : 0}
          ref={textRef}
          text={element.content}
          fontSize={element.fontSize}
          fill={element.textColor}
          width={element.width}
          height={element.height}
          align="center"
          verticalAlign="middle"
          wrap="word"
          onClick={onSelect}
          onDblClick={handleDblClick}
          onTap={handleDblClick} // Mobile support
        />
      )
      }

      <TransformerComponent shapeRef={shapeRef} isSelected={isSelected} />
    </Group>
  );
};

// Rectangle Component
const CanvasRectangle = ({ element, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();

  return (
    <>
      <Rect
        ref={shapeRef}
        x={element.x}
        y={element.y}
        width={element.width}
        height={element.height}
        fill={element.color}
        draggable
        opacity={element.opacity}
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          
          const node1 = e.target;

          const newWidth = node1.width() * node1.scaleX();
          const newHeight = node1.height() * node1.scaleY();

          // Reset scale to avoid accumulation
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...element,
            x: node.x(),
            y: node.y(),
            width: newWidth,  // //it should delete "* node.scaleY()", not only here all the places
            height: newHeight, //it should delete "* node.scaleY()", not only here all the places
          });
        }}
      />
      <TransformerComponent shapeRef={shapeRef} isSelected={isSelected} />
    </>
  );
};

// Circle Component
const CanvasCircle = ({ element, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();

  return (
    <>
      <Circle
        ref={shapeRef}
        x={element.x}
        y={element.y}
        radius={element.radius}
        opacity={element.opacity}
        fill={element.color}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={() => {
          const node = shapeRef.current;
          onChange({
            ...element,
            x: node.x(),
            y: node.y(),
            radius: node.radius(),
            scaleX: 1,
            scaleY: 1,
          });
        }}
      />
      <TransformerComponent shapeRef={shapeRef} isSelected={isSelected} />
    </>
  );
};

// Form Component for Element Properties
const ElementForm = ({ element, onChange }) => {
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
        Radius:
        <input
          type="number"
          value={element.radius}
          onChange={(e) => updateValue("radius", parseInt(e.target.value))}
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
          type="text"
          value={element.slug}
          onChange={(e) => updateValue("slug", parseInt(e.target.value))}
        />
      </label>
    </div>
  );
};

// Canvas Editor
const CanvasEditor = ({ templateId }) => {
  const [elements, setElements, undo, redo] = useUndoRedo([]);
  const [selectedId, setSelectedId] = useState(null);
  const stageRef = useRef();

  useEffect(() => {
    // This is for later use
    fetch(`/api/templates/${templateId}`)
      .then(res => res.json())
      .then(data => setElements(data.elements));
  }, [setElements, templateId]);

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
        opacity: 0.5,
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
        opacity: 0.5,
        slug: "{{circle}}"
      }
    ]);
  };

  const saveTemplate = async () => {
    localStorage.setItem('template', JSON.stringify({ name: "Updated Template", elements }))
    // await fetch(`/api/save-template`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name: "Updated Template", elements })
    // });
    alert("Template saved successfully!");
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Left Side - Canvas */}
      <div>
        <button onClick={addTextElement}>Add Text</button>
        <button onClick={addTextBoxElement}>Add Text Box</button>
        <button onClick={addImageElement}>Add Image</button>
        <button onClick={addRectangle}>Add Rectangle</button>
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={saveTemplate}>Save Template</button>
        <button onClick={bringToFront}>Bring to Front</button>
        <button onClick={sendToBack}>Send to Back</button>

        <Stage
          ref={stageRef}
          width={600}
          height={600}
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
              }
              return null;
            })}
          </Layer>
        </Stage>
      </div >

      {/* Right Side - Form Controls */}
      <div>
        <h3>Element Properties</h3>
        {selectedId ? (
          <ElementForm
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
