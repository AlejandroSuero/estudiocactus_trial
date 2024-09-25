"use client";
import { memo, useCallback, useMemo } from "react";
import { IoFingerPrintSharp } from "react-icons/io5";
import useStore from "~/stores/useStore";
import type { Point } from "~/types/collections";

interface PointsProps {
  points: Point[];
}

function RenderPoints({ points }: PointsProps) {
  const openSidebar = useStore((state) => state.openSidebar);
  const setActivePoint = useStore((state) => state.setActivePoint);

  const handlePointClick = useCallback(
    (point: Point) => {
      setActivePoint(point);
      openSidebar();
    },
    [setActivePoint, openSidebar]
  );

  const renderedPoints = useMemo(() => {
    return points.map((point) => (
      <div
        className="absolute flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/30 object-contain hover:bg-black/50 md:h-10 md:w-10 lg:h-14 lg:w-14 xl:h-16 xl:w-16"
        key={point.id}
        style={{
          left: `${point.coordX}%`,
          top: `${point.coordY}%`,
        }}
        onClick={() => handlePointClick(point)}
      >
        <IoFingerPrintSharp
          className="h-7 w-7 rotate-45 rounded-full border-2 border-white p-1 text-white md:h-8 md:w-8 lg:h-12 lg:w-12 xl:h-14 xl:w-14"
          size={35}
        />
      </div>
    ));
  }, [points, handlePointClick]);

  return <>{renderedPoints}</>;
}

export default memo(RenderPoints);
