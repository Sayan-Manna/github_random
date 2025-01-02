import React, { forwardRef, useRef, useState } from "react";
import {
  Cog,
  MonitorCog,
  ScanText,
  ShoppingCart,
  SlidersVertical,
  SquareCheckBig,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; count?: number }
>(({ className, children, count }, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={cn(
        "relative z-[5] flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <div
        className={cn(
          "absolute -top-8 rounded-md px-4 py-2 text-xs bg-white/80 text-black transition-opacity duration-200 whitespace-nowrap",
          isHovered ? " opacity-100" : " opacity-0"
        )}
      >
        <span>Count : {count}</span>
      </div>
    </div>
  );
});

Circle.displayName = "Circle";

export default function Demo({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref} count={1}>
            <MonitorCog className=" text-black" />
          </Circle>
        </div>

        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} count={10} className="size-16">
            <Cog className="size-full text-black" />
          </Circle>
        </div>

        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref} count={2}>
            <SquareCheckBig className="size-full text-black" />
          </Circle>
          <Circle ref={div2Ref} count={3}>
            <SlidersVertical className="size-full text-black" />
          </Circle>
          <Circle ref={div3Ref} count={4}>
            <ScanText className="size-full text-black" />
          </Circle>
          <Circle ref={div4Ref} count={5}>
            <ShoppingCart className="size-full text-black" />
          </Circle>
          <Circle ref={div5Ref} count={6}>
            <ShoppingCart className="size-full text-black" />
          </Circle>
        </div>
      </div>

      {/* AnimatedBeams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={3}
      />
    </div>
  );
}
