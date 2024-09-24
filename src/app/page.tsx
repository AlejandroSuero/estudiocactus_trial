import Image from "next/image";
import { getCollection, getMaterials } from "~/lib/getData";
import type { Point } from "~/types/collections";
import { RenderMaterials } from "~/components/RenderMaterials";
import { BASE_IMAGE_URL } from "~/lib/constants";
import { RenderPoints } from "~/components/RenderPoints";

export default async function HomePage() {
  const materials = await getMaterials();
  const points = (await getCollection("points")) as Point[];
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-gray-500">
      <div className="relative w-screen md:w-2/3 lg:w-1/2 xl:w-1/3">
        <Image
          src={BASE_IMAGE_URL}
          alt="Base kitchen image"
          width={1240}
          height={873}
          priority={true}
          loading="eager"
          className="object-fill"
        />
        <RenderMaterials materials={materials} />
        <RenderPoints points={points} />
      </div>
    </main>
  );
}
