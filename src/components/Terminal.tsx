"use client";

import { commands, fallbacks } from "@/constants";
import { useDraggable } from "@/hooks/useDraggable";
import { useTextZoom } from "@/hooks/useTextZoom";
import { HistoryType } from "@/types";
import findClosestCommand from "@/utils/findClosestCommand";
import { useMeasure } from "@uidotdev/usehooks";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CommandHistory from "./CommandHistory";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [ref, { width, height }] = useMeasure();
  const { pos, handleProps, containerProps } = useDraggable({ x: 100, y: 100 });
  const { scale, bind } = useTextZoom();

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

  function autoResize(el: HTMLTextAreaElement) {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  useLayoutEffect(() => {
    autoResize(inputRef.current as HTMLTextAreaElement);
  }, [scale]);

  return (
    <div {...containerProps} className="relative h-screen w-screen">
      <div
        ref={ref}
        className="absolute flex h-[clamp(400px,85vh,900px)] w-[clamp(320px,80vw,1200px)] flex-col items-center justify-center"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >
        <div
          {...handleProps}
          className="relative flex w-full cursor-grab rounded-t-xl bg-zinc-800 px-3 py-2.5 text-white select-none active:cursor-grabbing"
        >
          <div className="flex flex-0 items-center gap-3">
            <div className="size-3.5 cursor-pointer rounded-full bg-red-400" />
            <div className="size-3.5 cursor-pointer rounded-full bg-yellow-400" />
            <div className="size-3.5 cursor-pointer rounded-full bg-green-400" />
          </div>

          {/* Centered title */}
          <p className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-zinc-300">
            ridloghfry - terminal -- {Math.floor(width ?? 0)}x
            {Math.floor(height ?? 0)}
          </p>
        </div>

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
                autoResize(e.target);
                bottomRef.current?.scrollIntoView();
              }}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </form>

          {/* anchor for auto-scroll */}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
