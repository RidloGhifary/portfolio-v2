"use client";

import Clock from "@/components/Clock";
import Dock from "@/components/Dock";
import Terminal from "@/components/Terminal";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import React, { useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

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
      className="h-screen w-full flex justify-center items-center">
      {size && (size.width ?? 0) >= 768 ? (
        <React.Fragment>
          {!loaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-transparent backdrop-blur-lg">
              <h1
                className={`${freehand.className} macos-hello text-white italic text-7xl font-light`}>
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
              <Dock />
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="absolute inset-0 z-10 flex flex-col gap-12 items-center justify-center bg-transparent backdrop-blur-lg">
            <h1
              className={`${freehand.className} macos-hello text-white italic text-6xl font-light`}>
              hello
            </h1>
            <p
              className={`${freehand.className} text-white/60 italic delay-[2000ms]`}>
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
        className="absolute top-0 left-0 z-[-1] object-cover object-center w-full h-full"
        onLoadingComplete={() => setTimeout(() => setLoaded(true), 4000)}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
        unselectable="on"
      />
    </main>
  );
}
