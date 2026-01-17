"use client";

import Clock from "@/components/Clock";
import Dock from "@/components/Dock";
import Finder from "@/components/docks/finder/Finder";
import Terminal from "@/components/docks/terminal/Terminal";
import { useWindowSize } from "@uidotdev/usehooks";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import React, { useState } from "react";

const freehand = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-freehand",
});

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const size = useWindowSize();

  return (
    <main
      onContextMenu={(e) => e.preventDefault()}
      className="flex h-screen w-full items-center justify-center"
    >
      {size && (size.width ?? 0) >= 768 ? (
        <React.Fragment>
          {!loaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-transparent backdrop-blur-lg">
              <h1
                className={`${freehand.className} macos-hello text-7xl font-light text-white italic`}
              >
                hello
              </h1>
            </div>
          )}

          {loaded && (
            <React.Fragment>
              <div className="absolute top-10 left-1/2 -translate-x-1/2">
                <Clock />
              </div>

              <Terminal />
              <Finder />
              <Dock />
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-12 bg-transparent backdrop-blur-lg">
            <h1
              className={`${freehand.className} macos-hello text-6xl font-light text-white italic`}
            >
              hello
            </h1>
            <p
              className={`${freehand.className} text-white/60 italic delay-[2000ms]`}
            >
              Your screen is too small
            </p>
          </div>
        </React.Fragment>
      )}

      <Image
        src={"/wallpaper.jpg"}
        alt="wallpaper"
        priority
        width={1000}
        height={1000}
        className="absolute top-0 left-0 z-[-1] h-full w-full object-cover object-center"
        onLoad={() => setTimeout(() => setLoaded(true), 1000)}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
        unselectable="on"
      />
    </main>
  );
}
