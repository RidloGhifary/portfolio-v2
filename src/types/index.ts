type CommandType = {
  [key: string]: { description: string; response: string };
};

type FallbackType = string[];

type HistoryType = {
  command: string;
  response: string;
};

export type { CommandType, FallbackType, HistoryType };
