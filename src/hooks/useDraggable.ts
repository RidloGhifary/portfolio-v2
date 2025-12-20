"use client";

import { useState } from "react";

export function useDraggable(initialPos = { x: 0, y: 0 }) {
  const [pos, setPos] = useState(initialPos);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onDragStart = (e: { clientX: number; clientY: number }) => {
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const onDragMove = (e: { clientX: number; clientY: number }) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const onDragEnd = () => setDragging(false);

  return {
    pos,
    containerProps: {
      onMouseMove: onDragMove,
      onMouseUp: onDragEnd,
      onMouseLeave: onDragEnd,
    },
    handleProps: {
      onMouseDown: onDragStart,
    },
  };
}
