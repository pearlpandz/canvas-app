import React, { useEffect, useMemo, useRef } from "react";
import { Circle, Line } from "react-konva";

export default function MultiPointLine({
  points,
  activatePoints,
  isSelected,
  onPointDrag,
  onChange,
  ...rest
}) {
  const { x = 0, y = 0 } = rest;

  const mappedPoints = useMemo(() => {
    if (!points || !activatePoints) return [];
    const mappedPoints = [];
    for (let i = 0; i < points.length; i += 2) {
      mappedPoints.push({ x: points[i] + x, y: points[i + 1] + y });
    }
    return mappedPoints;
  }, [points, x, y, activatePoints]);

  const hoverRef = useRef(null);

  useEffect(() => {
    document.body.style.cursor = "default";
  }, [activatePoints]);

  const handleDragEnd = (e) => {
    const { onClick, draggable, ...element } = rest;
    onChange({ ...element, x: e.target.x(), y: e.target.y() });
  };

  return (
    <>
      <Line
        tension={0.5}
        stroke="black"
        strokeWidth={2}
        points={points}
        onDragEnd={handleDragEnd}
        {...rest}
      />
      {mappedPoints.map((point, index) => {
        return (
          <Circle
            x={point.x}
            y={point.y}
            radius={5}
            fill="white"
            stroke="#8986E3"
            strokeWidth={1}
            draggable
            onMouseOver={(e) => {
              e.target.setAttr("fill", "#eee");
              document.body.style.cursor = "pointer";
              hoverRef?.current?.setAttrs({
                x: e.target.x(),
                y: e.target.y(),
                visible: true,
              });
            }}
            onMouseOut={(e) => {
              e.target.setAttr("fill", "white");
              document.body.style.cursor = "default";
              hoverRef?.current?.setAttrs({
                visible: false,
              });
            }}
            onDragMove={(e) => {
              const x = e.target.x();
              const y = e.target.y();

              const newPoints = [...(points || [])];
              newPoints[index * 2] = x;
              newPoints[index * 2 + 1] = y;
              onPointDrag(newPoints);

              hoverRef?.current?.setAttrs({
                x,
                y,
                visible: true,
              });
            }}
          />
        );
      })}
    </>
  );
}
