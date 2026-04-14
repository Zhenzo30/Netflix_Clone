"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
    ? defaultValue
    : [min];

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn("relative w-full", className)}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full items-center touch-none select-none">
        
        {/* TRACK */}
        <SliderPrimitive.Track className="relative w-full h-1.5 overflow-hidden rounded-full bg-[#262626]">
          
          {/* 🔴 INDICATOR (equivalente a Range) */}
          <SliderPrimitive.Indicator
            className="absolute h-full bg-[#ff0000]"
          />
        </SliderPrimitive.Track>

        {/* THUMBS */}
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block size-5 shrink-0 rounded-full border-2 border-[#ff0000] bg-[#141414] shadow-sm transition hover:ring-4 focus-visible:ring-4"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };