import { useRef } from "react";
import { Circle } from "react-konva";
import TransformerComponent from "./TransformerComponent";

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

  export default CanvasCircle;