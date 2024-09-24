"use client";
import Image from "next/image";
import { BASE_IMAGE_URL } from "~/lib/constants";
import useStore from "~/stores/useStore";

export function RenderMaterials() {
  const selectedMaterial = useStore((state) => state.selectedMaterial);
  const selectedPoint = useStore((state) => state.selectedPoint);
  if (!selectedMaterial || !selectedPoint) {
    return null;
  }
  return (
    <Image
      src={Object.values(selectedMaterial?.layers)[0] ?? BASE_IMAGE_URL}
      alt={selectedMaterial?.name}
      width={1240}
      height={873}
      priority={true}
      loading="eager"
      quality={100}
      className="absolute left-0 top-0 h-full w-full object-contain"
    />
  );
}
