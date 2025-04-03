import { useRef, useState } from "react";
import { Group, Rect, Text } from "react-konva";
import { Html } from "react-konva-utils";
import TransformerComponent from "./TransformerComponent";

// Rectangle Text Component
const CanvasRectangleWithText = ({ element, isSelected, onSelect, onChange, isEditable = true }) => {
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

  const handleDragEnd = (e) => {
    onChange({ ...element, x: e.target.x(), y: e.target.y() });
  }

  const handleTransformEnd = () => {
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
  }

  return (
    <Group
      x={element.x}
      y={element.y}
      draggable
      onClick={isEditable ? onSelect : null}
      onTap={isEditable ? onSelect : null}
      onDragEnd={isEditable ? handleDragEnd : null}
    >
      {/* Rectangle */}
      <Rect
        ref={shapeRef}
        width={element.width}
        height={element.height}
        fill={element.color}
        // cornerRadius={5} // it should be parameterize
        draggable={isEditable}
        onTransformEnd={isEditable ? handleTransformEnd : null}
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
          x={shapeRef.current && textRef.current
            ? shapeRef.current.x() + shapeRef.current.width() - textRef.current.width()
            : 0}
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
          onClick={isEditable ? onSelect : null}
          onDblClick={isEditable ? handleDblClick : null}
          onTap={isEditable ? handleDblClick : null}
        />
      )
      }

      <TransformerComponent shapeRef={shapeRef} isSelected={isSelected} />
    </Group>
  );
};

export default CanvasRectangleWithText;