import { useRef } from "react";
import { Rect } from "react-konva";
import TransformerComponent from "./TransformerComponent";

// Rectangle Component
const CanvasRectangle = ({ element, isSelected, onSelect, onChange, isEditable = true }) => {
    const shapeRef = useRef();

    const handleTransformEnd = (e) => {
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
        width: newWidth,
        height: newHeight,
      });
    }
  
    return (
      <>
        <Rect
          ref={shapeRef}
          x={element.x}
          y={element.y}
          width={element.width}
          height={element.height}
          fill={element.color}
          draggable={isEditable}
          opacity={element.opacity}
          onClick={isEditable ? onSelect : null}
          onTap={isEditable ? onSelect : null}
          onTransformEnd={isEditable ? handleTransformEnd : null}
        />
        <TransformerComponent shapeRef={shapeRef} isSelected={isSelected} />
      </>
    );
  };

export default CanvasRectangle;