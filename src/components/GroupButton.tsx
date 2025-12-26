interface GroupButtonProps {
  handleClose: () => void;
  handleMinimize: () => void;
  handleMaximize: () => void;
}

export default function GroupButton({
  handleClose,
  handleMinimize,
  handleMaximize,
}: GroupButtonProps) {
  return (
    <div className="flex flex-0 items-center gap-3">
      <div
        onClick={handleClose}
        className="size-3.5 cursor-pointer rounded-full bg-red-400"
      />
      <div
        onClick={handleMinimize}
        className="size-3.5 cursor-pointer rounded-full bg-yellow-400"
      />
      <div
        onClick={handleMaximize}
        className="size-3.5 cursor-pointer rounded-full bg-green-400"
      />
    </div>
  );
}
