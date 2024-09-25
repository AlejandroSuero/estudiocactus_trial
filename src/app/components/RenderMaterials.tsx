"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BASE_IMAGE_URL } from "~/lib/constants";
import useStore from "~/stores/useStore";
import type { Material } from "~/types/collections";

export function RenderMaterials() {
  const activePoint = useStore((state) => state.activePoint);
  const selectedMaterials = useStore((state) => state.selectedMaterials);

  // Get all selected materials across all points (flatten the dictionary)
  const [allSelectedMaterials, setAllSelectedMaterials] = useState<Material[]>([]);
  useEffect(() => {
    const allMaterials = Object.values(selectedMaterials).flat();
    setAllSelectedMaterials(allMaterials);
  }, [selectedMaterials]);

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
