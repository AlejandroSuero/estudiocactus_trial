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
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);

  const handlePointClick = useCallback(
    (point: Point) => {
      setActivePoint(point);
      openSidebar();
    },
    [setActivePoint, openSidebar]
  );

  const renderedPoints = useMemo(() => {
    if (isSidebarOpen) return null;
    return points.map((point) => (
      <div
        className="absolute flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-black/30 object-contain hover:bg-black/50 md:h-7 md:w-7 lg:h-9 lg:w-9"
        key={point.id}
        style={{
          left: `${point.coordX}%`,
          top: `${point.coordY}%`,
        }}
        title={point.name}
        onClick={() => handlePointClick(point)}
      >
        <IoFingerPrintSharp
          className="h-4 w-4 rotate-45 rounded-full border border-white p-0.5 text-white md:h-6 md:w-6 lg:h-8 lg:w-8 lg:border-2 lg:p-1"
          size={35}
        />
      </div>
    ));
  }, [points, handlePointClick, isSidebarOpen]);

  return <>{renderedPoints}</>;
}

export default memo(RenderPoints);