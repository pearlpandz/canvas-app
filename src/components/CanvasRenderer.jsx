import { Stage, Layer, Text, Image } from "react-konva";
import { useEffect, useState } from "react";
import useImage from "use-image";

export const CanvasImage = ({ src, x, y, width, height }) => {
    const [image] = useImage(src);
    return <Image image={image} x={x} y={y} width={width} height={height} />;
  };

const CanvasRenderer = ({ templateId, businessDetails }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    fetch(`/api/get-template/${templateId}`)
      .then(res => res.json())
      .then(data => {
        const updatedElements = data.elements.map(el => ({
          ...el,
          content: el.content?.replace("{{business_name}}", businessDetails.name)
                               .replace("{{phone}}", businessDetails.phone)
        }));
        setElements(updatedElements);
      });
  }, [templateId, businessDetails]);

  return (
    <Stage width={500} height={300} style={{ border: "1px solid black" }}>
      <Layer>
        {elements.map(el => {
          if (el.type === "image") {
            return <CanvasImage key={el.id} src={el.src} x={el.x} y={el.y} width={el.width} height={el.height} />;
          } else if (el.type === "text") {
            return <Text key={el.id} text={el.content} x={el.x} y={el.y} fontSize={el.fontSize} fill={el.color} />;
          }
          return null;
        })}
      </Layer>
    </Stage>
  );
};

export default CanvasRenderer;
