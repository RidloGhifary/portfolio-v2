"use client";

import { useEffect, useRef, useState } from "react";
import { commands, fallbacks } from "@/constants";
import { HistoryType } from "@/types";
import CommandHistory from "./CommandHistory";
import findClosestCommand from "@/utils/findClosestCommand";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

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
      } else {
        output = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }

      // if command has a run function, execute it
      if (typeof command?.run === "function") {
        output = command.run(args);
      } else {
        output =
          command?.response ||
          fallbacks[Math.floor(Math.random() * fallbacks.length)];
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

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-screen bg-black text-white font-mono p-4 font-medium overflow-y-auto">
      <CommandHistory history={history} />

      <form onSubmit={handleSubmit} className="flex">
        <span className="mr-2">
          <span className="text-green-500">ridloghfry:</span> $
        </span>

        <textarea
          ref={inputRef}
          autoFocus
          rows={1}
          className="bg-black outline-none text-white flex-1 resize-none overflow-hidden"
          value={input}
          placeholder="help"
          onChange={(e) => {
            setInput(e.target.value);
            bottomRef.current?.scrollIntoView();

            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </form>
      {/* anchor for auto-scroll */}
      <div ref={bottomRef} />
    </div>
  );
}
