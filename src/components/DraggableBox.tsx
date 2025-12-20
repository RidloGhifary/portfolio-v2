"use client";
import { useState } from "react";

export default function DraggableBox() {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = (e: { clientX: number; clientY: number }) => {
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const onMouseMove = (e: { clientX: number; clientY: number }) => {
    if (!dragging) return;

    setPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const onMouseUp = () => setDragging(false);

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{ width: "100vw", height: "100vh" }}>
      <div
        onMouseDown={onMouseDown}
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          background: "dodgerblue",
          cursor: "grab",
          transform: `translate(${pos.x}px, ${pos.y}px)`,
        }}
      />
    </div>
  );
}
