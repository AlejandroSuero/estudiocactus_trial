"use client";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import useStore from "~/stores/useStore";
import { FaCheck } from "react-icons/fa";
import { MdKeyboardArrowUp } from "react-icons/md";
import type { Material, Point } from "~/types/collections";

interface SidebarProps {
  materials: Record<string, Material[]>;
  points: Point[];
}

function Sidebar({ materials, points }: SidebarProps) {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  const selectMaterial = useStore((state) => state.selectMaterial);
  const selectedMaterials = useStore((state) => state.selectedMaterials);
  const activePoint = useStore((state) => state.activePoint);
  const closeSidebar = useStore((state) => state.closeSidebar);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const setActivePoint = useStore((state) => state.setActivePoint);

  const handleMaterialClick = useCallback(
    (material: Material) => {
      selectMaterial(activePoint?.id ?? "", material);
    },
    [activePoint, selectMaterial]
  );

  const handleNextPointClick = useCallback(() => {
    const nextPointIndex = points.findIndex((point) => point.id === activePoint?.id) + 1;
    if (nextPointIndex < points.length) {
      setActivePoint(points[nextPointIndex]!);
    } else {
      setActivePoint(points[0]!);
    }
  }, [activePoint, setActivePoint, points]);

  const handlePreviousPointClick = useCallback(() => {
    const previousPointIndex = points.findIndex((point) => point.id === activePoint?.id) - 1;
    if (previousPointIndex >= 0) {
      setActivePoint(points[previousPointIndex]!);
    } else {
      setActivePoint(points[points.length - 1]!);
    }
  }, [activePoint, setActivePoint, points]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      // Cleanup event listener on unmount
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSidebarOpen, closeSidebar]);

  const sidebar = useMemo(() => {
    const pointId = activePoint?.id;
    if (!pointId) return null;
    const currentAppliedMaterial = selectedMaterials[pointId];

    return (
      <aside
        ref={sidebarRef}
        className={`fixed bottom-0 right-0 z-50 mr-0 h-[60vh] w-full transform rounded-t-xl bg-gray-800/85 px-6 py-4 text-white transition-transform duration-300 ease-in-out md:rounded-xl ${isSidebarOpen ? "translate-y-0 md:mr-2 md:translate-x-0" : "translate-y-full md:mr-0 md:translate-x-full"} md:bottom-auto md:right-0 md:h-fit md:w-80 md:translate-y-0`}
      >
        <button
          onClick={handlePreviousPointClick}
          title="Go to previous point of change"
          className="flex h-8 w-full items-center justify-center rounded-md border border-white p-2 px-4 hover:bg-gray-400 hover:text-gray-900 focus:outline-none"
        >
          <MdKeyboardArrowUp size={50} />
        </button>
        <div className="flex flex-col items-start justify-center py-4">
          <h2 className="text-lg font-bold">Materials</h2>
          <h3 className="text-md font-medium text-gray-200">{activePoint?.name}</h3>
        </div>
        <ul className="flex flex-col space-y-4 overflow-y-auto pb-4">
          {materials[pointId]?.map((material: Material) => {
            let isActive = false;
            if (currentAppliedMaterial) {
              isActive = currentAppliedMaterial[0]?.id === material.id;
            }
            return (
              <li
                key={material.id}
                onClick={() => handleMaterialClick(material)}
                className={`group relative flex cursor-pointer items-center space-x-2 rounded-md p-2 text-white ${isActive ? "bg-gray-500" : ""} hover:bg-gray-400 hover:text-gray-900 focus:outline-none`}
              >
                <div className="relative overflow-hidden rounded-xl border-[3px] border-white group-hover:border-gray-900">
                  <Image
                    src={material.materialPreview}
                    alt={material.name}
                    title={material.name}
                    width={48}
                    height={material.name === "Frame White" ? 99 : 48}
                    loading="lazy"
                    className="h-[60px] w-[60px] object-cover"
                  />
                  <div className={`absolute top-0 h-full w-full ${isActive ? "bg-gray-800/25" : "hidden"}`} />
                  <FaCheck
                    size={24}
                    className={`absolute right-[50%] top-[50%] ${isActive ? "" : "hidden"} -translate-y-[50%] translate-x-[50%]`}
                  />
                </div>
                <span className="text-sm font-medium">{material.name}</span>
              </li>
            );
          })}
        </ul>
        <button
          onClick={handleNextPointClick}
          title="Go to next point of change"
          className="flex h-8 w-full items-center justify-center rounded-md border border-white p-2 px-4 hover:bg-gray-400 hover:text-gray-900 focus:outline-none"
        >
          <MdKeyboardArrowUp size={50} className="rotate-180" />
        </button>
      </aside>
    );
  }, [
    materials,
    activePoint,
    handleMaterialClick,
    isSidebarOpen,
    selectedMaterials,
    handleNextPointClick,
    handlePreviousPointClick,
  ]);

  return <>{sidebar}</>;
}

export default memo(Sidebar);
