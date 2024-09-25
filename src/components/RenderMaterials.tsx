"use client";
import Image from "next/image";
import { BASE_IMAGE_URL } from "~/lib/constants";
import useStore from "~/stores/useStore";

export function RenderMaterials() {
  const activePoint = useStore((state) => state.activePoint);
  const selectedMaterials = useStore((state) => state.selectedMaterials);

  // Get all selected materials across all points (flatten the dictionary)
  const allSelectedMaterials = Object.values(selectedMaterials).flat();

  return (
    <>
      {allSelectedMaterials.map((material, index) => (
        <Image
          src={Object.values(material.layers)[0] ?? BASE_IMAGE_URL}
          alt={material.name}
          width={1240}
          height={873}
          priority={true}
          loading="eager"
          quality={100}
          className="absolute left-0 top-0 h-full w-full object-contain"
          key={`${activePoint?.id}-${material.id}-${index}`}
        />
      ))}
    </>
  );
}
