"use client";

import { commands, fallbacks } from "@/constants";
import { useApplication } from "@/hooks/useApplication";
import { useDraggable } from "@/hooks/useDraggable";
import { useTextZoom } from "@/hooks/useTextZoom";
import { HistoryType } from "@/types";
import findClosestCommand from "@/utils/findClosestCommand";
import { useMeasure } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import CommandHistory from "./CommandHistory";
import GroupButton from "./GroupButton";
import { cn } from "@/utils/cn";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const { scale, bind } = useTextZoom();
  const [ref, { width, height }] = useMeasure();
  const {
    windowStatus,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    prevBounds,
  } = useApplication();
  const { pos, handleProps, containerProps } = useDraggable({
    initialPos: { x: 100, y: 100 },
    handleOnDragStart: () => setIsDragging(true),
    handleOnDragEnd: () => setIsDragging(false),
    disabled: windowStatus === "maximized",
  });

  const isMinimized = windowStatus === "minimized";
  const isMaximized = windowStatus === "maximized";

  // scroll to bottom whenever history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [history]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const [cmd, ...args] = input.trim().split(" ");
    const command = commands[cmd];

    let output;

    // handle special commands
    if (commands[input]) {
      output = commands[input].response;

      if (input === "clear") {
        setHistory([]);
        setInput("");
        setHistoryIndex(null);

        return;
      }

      // if command has a run function, execute it
      if (typeof command?.run === "function") {
        output = command.run(args);
      }
    } else {
      const suggestion = findClosestCommand(input, Object.keys(commands));

      if (suggestion) {
        output = `did you mean "${suggestion}"?`;
      } else if (typeof command?.run === "function") {
        output = command.run(args);
      } else {
        output = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }
    }

    setHistory([...history, { command: input, response: output as string }]);
    setInput("");
    setHistoryIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }

    // Navigate history
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex === null) {
        setHistoryIndex(history.length - 1);
        setInput(history[history.length - 1]?.command || "");
      } else if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        setInput(history[historyIndex - 1].command);
      }
    }

    // Navigate history
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        setInput(history[historyIndex + 1].command);
      } else {
        setHistoryIndex(null);
        setInput("");
      }
    }
  };

  const toggleMaximizeHandler = () => {
    toggleMaximize("terminal_1", {
      x: pos.x,
      y: pos.y,
      width: width ?? 0,
      height: height ?? 0,
    });
  };

  return (
    <AnimatePresence>
      {windowStatus !== "closed" && (
        <motion.div
          ref={ref}
          {...containerProps}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: isDragging ? 1 : isMinimized ? 0 : 1,
            x: isMaximized ? 0 : (prevBounds?.x ?? pos.x),
            y: isMaximized ? 0 : (prevBounds?.y ?? pos.y),
            width: isMaximized
              ? "100vw"
              : (prevBounds?.width ?? "clamp(320px,80vw,1200px)"),
            height: isMaximized
              ? "100dvh"
              : (prevBounds?.height ?? "clamp(400px,85vh,900px)"),
            borderRadius: isMaximized ? 0 : 12,
          }}
          transition={
            isDragging
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: isMaximized ? 300 : 260,
                  damping: isMaximized ? 35 : 22,
                }
          }
          className="absolute flex flex-col bg-black"
        >
          <div className={cn("relative w-full", isMaximized && "group")}>
            {/* TERMINAL HEADER */}
            <div
              {...handleProps}
              className={cn(
                "relative flex w-full cursor-grab rounded-t-xl bg-zinc-800 px-3 py-2.5 text-white select-none active:cursor-grabbing",
                {
                  "cursor-grab active:cursor-grabbing": !isMaximized,
                  // slide down on hover
                  "absolute -top-10 right-0 left-0 transition-all duration-200 ease-in-out group-hover:top-0":
                    isMaximized,
                },
              )}
            >
              <div className="absolute top-8 right-0 left-0 h-12 cursor-default" />

              <GroupButton
                handleClose={() => {
                  closeWindow("terminal_1");
                  setHistoryIndex(null);
                  setHistory([]);
                  setInput("");
                }}
                handleMinimize={() => minimizeWindow("terminal_1")}
                handleMaximize={toggleMaximizeHandler}
              />

              {/* Centered title */}
              <p className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-zinc-300">
                ridloghfry - terminal -- {Math.floor(width ?? 0)}x
                {Math.floor(height ?? 0)}
              </p>
            </div>
          </div>

          {/* TERMINAL CONTENT */}
          <div className="min-h-0 flex-1">
            <div
              {...bind}
              onClick={() => inputRef.current?.focus()}
              style={
                {
                  "--cmd-scale": scale,
                  fontSize: `${scale}em`,
                } as React.CSSProperties
              }
              className="h-full w-full overflow-y-auto rounded-b-xl bg-black p-4 font-mono font-medium text-white"
            >
              <CommandHistory history={history} />

              <form onSubmit={handleSubmit} className="flex">
                <span className="mr-2">
                  <span className="text-green-500">ridloghfry:</span> $
                </span>

                <textarea
                  ref={inputRef}
                  autoFocus
                  rows={1}
                  className="flex-1 resize-none overflow-hidden bg-black text-white outline-none"
                  value={input}
                  placeholder="help"
                  onChange={(e) => {
                    setInput(e.target.value);
                    bottomRef.current?.scrollIntoView();
                  }}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </form>

              {/* anchor for auto-scroll */}
              <div ref={bottomRef} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
