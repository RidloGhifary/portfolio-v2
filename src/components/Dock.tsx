import { docks } from "@/constants/index";
import { useApplication } from "@/hooks/useApplication";
import Image from "next/image";

export default function Dock() {
  const { windows, openWindow, focusWindow } = useApplication();

  return (
    <div className="absolute bottom-0 left-1/2 z-[99999999] mb-2 flex -translate-x-1/2 items-start justify-center gap-2 rounded-3xl border border-stone-500 bg-stone-600/50 p-1.5 shadow-lg shadow-black/30 backdrop-blur-lg">
      {docks.map((dock: any) => {
        const window = windows[dock.app_id as keyof typeof windows];

        return (
          <div
            key={dock.id}
            onClick={() => {
              openWindow(dock.app_id);
              focusWindow(dock.app_id);
            }}
            className="flex cursor-pointer flex-col items-center gap-0.5"
          >
            <Image
              src={dock.imageSrc}
              alt={dock.alt}
              priority
              width={100}
              height={100}
              className="size-14 transition-transform duration-200 ease-in-out hover:-translate-y-2 hover:scale-125"
            />

            {window.status !== "closed" && (
              <div className="size-1 rounded-full bg-white" />
            )}
          </div>
        );
      })}
    </div>
  );
}
