import Image from "next/image";
import { BASE_IMAGE_URL } from "~/lib/constants";
import type { Material } from "~/types/collections";

interface MaterialsProps {
  materials: Record<string, Material[]>;
}

export function RenderMaterials({ materials }: MaterialsProps) {
  "use client";
  return Object.entries(materials).map(([_point, materials]) =>
    materials.map((material) => (
      <Image
        src={Object.values(material.layers)[0] ?? BASE_IMAGE_URL}
        alt={material.name}
        width={1240}
        height={873}
        priority={true}
        loading="eager"
        className="absolute left-0 top-0 h-full w-full object-fill"
        key={material.id}
      />
    ))
  );
}
