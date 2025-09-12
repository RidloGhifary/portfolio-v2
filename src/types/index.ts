type CommandType = {
  [key: string]: {
    description: string;
    response?: string;
    usage?: string;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    run?: (args?: any) => string | void;
  };
};

type FallbackType = string[];

type HistoryType = {
  command: string;
  response: string;
};

export type { CommandType, FallbackType, HistoryType };
