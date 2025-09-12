import { HistoryType } from "@/types";

interface Props {
  history: HistoryType[];
}

export default function CommandHistory({ history }: Props) {
  return (
    <>
      {history.map((item, i) => (
        <div key={i}>
          <div className="flex">
            <span className="mr-2">
              <span className="text-green-500">ridloghfry:</span> $
            </span>

            <pre className="whitespace-pre-wrap">{item.command}</pre>
          </div>

          <pre className="whitespace-pre-wrap">{item.response}</pre>
        </div>
      ))}
    </>
  );
}
