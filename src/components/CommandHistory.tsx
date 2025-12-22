import { HistoryType } from "@/types";
import { cn } from "@/utils/cn";

interface Props {
  history: HistoryType[];
  className?: string;
}

export default function CommandHistory({ history, className }: Props) {
  return (
    <>
      {history.map((item, i) => (
        <div key={i} className={cn("text-12", className)}>
          <div className="flex">
            <span className="mr-2">
              <span className="text-green-500">ridloghfry:</span> $
            </span>

            <pre className="whitespace-pre-wrap">{item.command}</pre>
          </div>

          <pre className={cn("whitespace-pre-wrap", className)}>
            {item.response}
          </pre>
        </div>
      ))}
    </>
  );
}
