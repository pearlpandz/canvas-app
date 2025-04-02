import { useRef } from "react";
import { Rect } from "react-konva";
import TransformerComponent from "./TransformerComponent";

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
              width: newWidth,
              height: newHeight,
            });
          }}
        />
        <TransformerComponent shapeRef={shapeRef} isSelected={isSelected} />
      </>
    );
  };

export default CanvasRectangle;