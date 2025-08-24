"use client";
import { cn, ContainerTextFlip } from "@reactbook/ui-web";
import React from "react";
import { ClientOnly } from "@reactbook/ui-web";
import { motion } from "motion/react";

export default function Page() {
  return (
    <div className="flex h-dvh w-full flex-col">
      <ClientOnly
        fallback=<div className="flex h-full w-full items-center justify-center">
          ...
        </div>
      >
        <ContainerTextFlipDemo />
      </ClientOnly>
    </div>
  );
}

function ContainerTextFlipDemo() {
  const words = ["better", "modern", "beautiful", "awesome"];
  return (
    <motion.h1
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      className={cn(
        "relative mb-6 max-w-2xl text-left text-4xl leading-normal font-bold tracking-tight text-zinc-700 md:text-7xl dark:text-zinc-100"
      )}
      layout
    >
      <div className="inline-block">
        Make your websites look 10x <ContainerTextFlip words={words} />
        {/* <Blips /> */}
      </div>
    </motion.h1>
  );
}
