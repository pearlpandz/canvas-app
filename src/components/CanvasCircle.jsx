import { useRef } from "react";
import { Circle } from "react-konva";
import TransformerComponent from "./TransformerComponent";

// Circle Component
const CanvasCircle = ({ element, isSelected, onSelect, onChange, isEditable = true }) => {
  const shapeRef = useRef();

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    onChange({
      ...element,
      x: node.x(),
      y: node.y(),
      radius: node.radius(),
      scaleX: 1,
      scaleY: 1,
    });
  }

  const handleDragEnd = (e) => {
    onChange({ ...element, x: e.target.x(), y: e.target.y() });
  }

  return (
    <>
      <Circle
        ref={shapeRef}
        x={element.x}
        y={element.y}
        radius={element.radius}
        opacity={element.opacity / 100}
        fill={element.color}
        draggable={isEditable}
        onDragEnd={isEditable ? handleDragEnd : null}
        onClick={isEditable ? onSelect : null}
        onTap={isEditable ? onSelect : null}
        onTransformEnd={isEditable ? handleTransformEnd : null}
      />
      <TransformerComponent shapeRef={shapeRef} isSelected={isSelected} />
    </>
  );
};

export default CanvasCircle;