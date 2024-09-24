import { IoFingerPrintSharp } from "react-icons/io5";
import type { Point } from "~/types/collections";

interface PointsProps {
  points: Point[];
}

export function RenderPoints({ points }: PointsProps) {
  "use client";
  return points.map((point) => (
    <div
      className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-black/30"
      key={point.id}
      style={{
        left: `${point.coordX}%`,
        top: `${point.coordY}%`,
      }}
    >
      <IoFingerPrintSharp className="scale-125 rounded-full border-2 border-white p-1 text-white" size={35} />
    </div>
  ));
}
