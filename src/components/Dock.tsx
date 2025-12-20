import Image from "next/image";
import { docks } from "@/constants/index";

export default function Dock() {
  return (
    <div className="bg-stone-600/50 backdrop-blur-lg border-stone-500 border rounded-3xl mb-2 p-1.5 absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center items-start shadow-lg gap-2 shadow-black/30">
      {docks.map((dock: any) => (
        <div
          key={dock.id}
          className="flex flex-col gap-0.5 items-center cursor-not-allowed">
          <Image
            src={dock.imageSrc}
            alt={dock.alt}
            priority
            width={100}
            height={100}
            className="size-14 hover:scale-125 hover:-translate-y-2 transition-transform duration-200 ease-in-out"
          />

          {dock.is_active && <div className="size-1 rounded-full bg-white" />}
        </div>
      ))}
    </div>
  );
}
