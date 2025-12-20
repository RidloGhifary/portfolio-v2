export default function Clock() {
  const now = new Date();

  const date = now.getDate();
  const day = now.toLocaleDateString("en-US", { weekday: "short" });
  const month = now.toLocaleDateString("en-US", { month: "short" });
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="space-y-2 text-center select-none">
      <p className="text-white/80 text-md font-bold text-3xl leading-snug">
        {day} {month} {date}
      </p>
      <p className="text-white/80 text-[130px] leading-22 font-bold">{time}</p>
    </div>
  );
}
