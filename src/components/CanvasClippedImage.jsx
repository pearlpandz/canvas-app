import { Image, Group } from "react-konva";
import { useRef } from "react";
import useImage from "use-image";
import TransformerComponent from "./TransformerComponent";

const CanvasClippedImage = ({ element, isSelected, onSelect, onChange, isEditable = true }) => {
    const [image] = useImage(element.src);
    const shapeRef = useRef();

    const handleDragMove = (e) => {
        const node = e.target;
        onChange({
            ...element,
            x: node.x(),
            y: node.y(),
        })
    }

    const handleTransformEnd = () => {
        const node = shapeRef.current;
        onChange({
            x: node.x(),
            y: node.y(),
            width: node.width() * node.scaleX(),
            height: node.height() * node.scaleY(),
            scaleX: 1,
            scaleY: 1,
        });
    }

    return (
        <>
            <Group
                ref={shapeRef}
                x={element.x}
                y={element.y}
                clipFunc={(ctx) => clipShape(ctx, element)}
                onClick={isEditable ? onSelect : null}
                onTap={isEditable ? onSelect : null}
                draggable={isEditable}
                onDragMove={isEditable ? handleDragMove : null}
                onTransformEnd={isEditable ? handleTransformEnd : null}
            >
                <Image fill={element.color} image={image} width={element.width} height={element.height} />
            </Group>
            <TransformerComponent shapeRef={shapeRef} isSelected={isSelected} />
        </>
    );
};

// Clip Shape Function
const clipShape = (ctx, element) => {
    const { width, height, radius} = element;

    ctx.beginPath();

    ctx.moveTo(radius, 0);
    ctx.lineTo(width - radius, 0);
    ctx.arcTo(width, 0, width, radius, radius);
    ctx.lineTo(width, height - radius);
    ctx.arcTo(width, height, width - radius, height, radius);
    ctx.lineTo(radius, height);
    ctx.arcTo(0, height, 0, height - radius, radius);
    ctx.lineTo(0, radius);
    ctx.arcTo(0, 0, radius, 0, radius); // 🔹 Rectangle with Rounded Corners


    ctx.closePath();
};

export default CanvasClippedImage;
