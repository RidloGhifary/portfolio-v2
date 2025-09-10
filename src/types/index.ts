import React from "react";

type CommandType = {
  [key: string]: {
    description: string;
    response?: string;
    usage?: string;
    run?: (args?: any) => string | void;
  };
};

type FallbackType = string[];

type HistoryType = {
  command: string;
  response: string;
};

export type { CommandType, FallbackType, HistoryType };
