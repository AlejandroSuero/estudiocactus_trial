"use client";
import Image from "next/image";
import useStore from "~/stores/useStore";
import type { Material } from "~/types/collections";

interface SideBarProps {
  materials: Record<string, Material[]>;
}

export default function SideBar({ materials }: SideBarProps) {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  const selectMaterial = useStore((state) => state.selectMaterial);
  const selectedPoint = useStore((state) => state.selectedPoint);
  const closeSidebar = useStore((state) => state.closeSidebar);

  const handleMaterialClick = (material: Material) => {
    selectMaterial(material);
    console.log(material);
    closeSidebar();
  };

  const pointId = selectedPoint?.id;
  if (!pointId) return null;

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-screen w-full bg-gray-800 text-white transition-all duration-300 ease-in-out hover:text-gray-800 ${isSidebarOpen ? "translate-x-[85%]" : "translate-x-full"}`}
    >
      <button onClick={closeSidebar} className="fixed right-12 top-0 z-50 p-2 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <ul className="flex flex-col space-y-4 p-4">
        {materials[pointId]?.map((material: Material) => (
          <li
            key={material.id}
            onClick={() => handleMaterialClick(material)}
            className="relative flex cursor-pointer items-center space-x-2 rounded-md p-2 text-white hover:bg-gray-400 hover:text-gray-900 focus:outline-none"
          >
            <Image
              src={material.materialPreview}
              alt={material.name}
              width={48}
              height={material.name === "Frame White" ? 99 : 48}
              loading="lazy"
              className="h-[48px] w-[48px] rounded-md object-cover"
            />
            <span className="text-sm font-medium">{material.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
