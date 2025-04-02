import useImage from "use-image";
import TransformerComponent from "./TransformerComponent";
import { useRef } from "react";
import { updateImageUrl } from "../utils";
import { Image } from "react-konva";

// Image Component
const CanvasImage = ({ element, isSelected, onSelect, onChange }) => {
  const [image] = useImage(element.src);
  console.log('element.src', image)
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
        onDragMove={(e) => {
          const node = e.target;
          onChange({
            ...element,
            x: node.x(), 
            y: node.y(), 
          })
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const newSrc = updateImageUrl(element.src, node.width(), node.height())
          
          const node1 = e.target;
          const newWidth = node1.width() * node1.scaleX();
          const newHeight = node1.height() * node1.scaleY();

          // Reset scale to avoid accumulation
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...element,
            width: newWidth,
            height: newHeight,
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

export default CanvasImage;