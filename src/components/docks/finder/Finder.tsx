"use client";

import GroupButton from "@/components/GroupButton";
import { finderFavorites, finderiCloud } from "@/constants";
import { useApplication } from "@/hooks/useApplication";
import { useDraggable } from "@/hooks/useDraggable";
import { cn } from "@/utils/cn";
import { useMeasure } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function Finder() {
  const [isDragging, setIsDragging] = useState(false);

  // application hooks
  const { windows, focusWindow, closeWindow, minimizeWindow, toggleMaximize } =
    useApplication();

  // measure window hooks
  const [ref, { width, height }] = useMeasure();

  // draggable hooks
  const { pos, handleProps, containerProps } = useDraggable({
    initialPos: { x: 100, y: 100 },
    handleOnDragStart: () => setIsDragging(true),
    handleOnDragEnd: () => setIsDragging(false),
    disabled: windows["finder_1"].status === "maximized",
  });

  const toggleMaximizeHandler = () => {
    toggleMaximize("finder_1", {
      x: pos.x,
      y: pos.y,
      width: width ?? 0,
      height: height ?? 0,
    });
  };

  const finder = windows["finder_1"];

  const isMinimized = finder.status === "minimized";
  const isMaximized = finder.status === "maximized";

  return (
    <AnimatePresence>
      {finder.status !== "closed" && (
        <motion.div
          {...containerProps}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: isDragging ? 1 : isMinimized ? 0 : 1,
            x: isMaximized ? 0 : (finder.prevBounds?.x ?? pos.x),
            y: isMaximized ? 0 : (finder.prevBounds?.y ?? pos.y),
            width: isMaximized
              ? "100vw"
              : (finder.prevBounds?.width ?? "clamp(320px,80vw,1200px)"),
            height: isMaximized
              ? "100dvh"
              : (finder.prevBounds?.height ?? "clamp(400px,85vh,900px)"),
            borderRadius: isMaximized ? 0 : 12,
            borderColor: isMaximized ? "transparent" : "border-stone-600",
          }}
          transition={
            isDragging
              ? { duration: 0 }
              : { type: "spring", stiffness: 260, damping: 22 }
          }
          className={cn(
            "absolute overflow-hidden rounded-xl border border-stone-600 bg-stone-950",
          )}
          style={{ zIndex: finder.zIndex }}
          onPointerDown={() => focusWindow("finder_1")}
        >
          <div className="relative flex h-full w-full select-none">
            <div
              {...handleProps}
              className="absolute top-0 right-0 left-0 z-0 h-8 w-full"
            />

            {/* SIDE BAR */}
            <div className="h-full w-[18%] space-y-7 bg-stone-900 p-6 pt-8 pr-3 pl-4">
              <div className="pl-2">
                <GroupButton
                  handleClose={() => closeWindow("finder_1")}
                  handleMinimize={() => minimizeWindow("finder_1")}
                  handleMaximize={toggleMaximizeHandler}
                />
              </div>

              {/* FINDER FAVORITES */}
              <div className="space-y-2 text-white select-none">
                <p className="pl-2 text-xs font-normal text-gray-500">
                  Favorites
                </p>

                <div className="space-y-1">
                  {finderFavorites.map((item) => (
                    <div
                      key={item.id}
                      className="flex cursor-pointer items-center gap-2 rounded-md p-1 pl-1.5 text-sm font-medium text-white hover:bg-gray-500/20"
                    >
                      <item.icon className="size-4 text-blue-600" /> {item.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* FINDER ICLOUD */}
              <div className="space-y-2 text-white select-none">
                <p className="pl-2 text-xs font-normal text-gray-500">iCloud</p>

                <div className="space-y-1">
                  {finderiCloud.map((item) => (
                    <div
                      key={item.id}
                      className="flex cursor-pointer items-center gap-2 rounded-md p-1 pl-1.5 text-sm font-medium text-white hover:bg-gray-500/20"
                    >
                      <item.icon className="size-4 text-blue-600" /> {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex h-full w-full items-center justify-center">
              <h1 className="text-center text-2xl text-white">
                Hi, I am Finder and it&apos;s in under <i>development</i>
              </h1>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
