import { Stage, Layer, Text, Image, Group } from "react-konva";
import { useEffect, useState } from "react";
import CanvasText from "./CanvasText";
import CanvasRectangleWithText from "./CanvasRectangleWithText";
import CanvasRectangle from "./CanvasRectangle";
import CanvasCircle from "./CanvasCircle";
import CanvasImage from "./CanvasImage";
import CanvasClippedImage from "./CanvasClippedImage";

const CanvasRenderer = ({ templateId, businessDetails }) => {
  const [elements, setElements] = useState([]);
  const isEditable = false;

  useEffect(() => {
    // fetch(`/api/get-template/${templateId}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     const updatedElements = data.elements.map(el => ({
    //       ...el,
    //       content: el.content?.replace("{{business_name}}", businessDetails.name)
    //                            .replace("{{phone}}", businessDetails.phone)
    //     }));
    //     setElements(updatedElements);
    //   });

    const data = JSON.parse(localStorage.getItem('template'))
    const updatedElements = data.elements.map(el => ({
      ...el,
      content: el.content?.replace("{{business_name}}", businessDetails.name)
                            .replace("{{phone}}", businessDetails.phone)
    }));
    setElements(updatedElements);
  }, [templateId, businessDetails]);

  return (
    <Stage
          width={600}
          height={600}
        >
          <Layer>
            {elements.map(el => {
              if (el.type === "image") {
                console.log(el)
                return <CanvasImage key={el.id} element={el} isEditable={isEditable}  />;
              } else if (el.type === "text") {
                return <CanvasText key={el.id} element={el} isEditable={isEditable} />;
              } else if (el.type === "text-box") {
                return <CanvasRectangleWithText key={el.id} element={el} isEditable={isEditable} />;
              } else if (el.type === "rectangle") {
                return <CanvasRectangle key={el.id} element={el} isEditable={isEditable} />;
              } else if (el.type === "circle") {
                return <CanvasCircle key={el.id} element={el} isEditable={isEditable} />;
              } else if (el.type === "clip-image") {
                return <CanvasClippedImage key={el.id} element={el} isEditable={isEditable} />
              }
              return null;
            })}
          </Layer>
        </Stage>
  );
};

export default CanvasRenderer;
