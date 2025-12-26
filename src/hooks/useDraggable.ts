"use client";

import { useState } from "react";

interface Props {
  initialPos: { x: number; y: number };
  disabled: boolean;
  handleOnDragStart: () => void;
  handleOnDragEnd: () => void;
}

export function useDraggable({
  initialPos,
  disabled,
  handleOnDragStart,
  handleOnDragEnd,
}: Props) {
  const [pos, setPos] = useState(initialPos);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onDragStart = (e: { clientX: number; clientY: number }) => {
    if (disabled) return;
    handleOnDragStart();
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const onDragMove = (e: { clientX: number; clientY: number }) => {
    if (!dragging || disabled) return;
    setPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const onDragEnd = () => {
    handleOnDragEnd();
    setDragging(false);
  };

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
