import Image from "next/image";
import { BASE_IMAGE_URL } from "~/lib/constants";
import { getCollection, getMaterials } from "~/lib/getData";
import type { Point } from "~/types/collections";
import { RenderMaterials } from "./components/RenderMaterials";
import RenderPoints from "./components/RenderPoints";
import Sidebar from "./components/Sidebar";

export default async function HomePage() {
  const materials = await getMaterials();
  if (!materials) return <p>Loading materials...</p>;
  const points = (await getCollection("points")) as Point[];
  if (!points) return <p>Loading points...</p>;

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-start md:justify-center">
      <Image
        src={BASE_IMAGE_URL}
        alt="Base kitchen image"
        width={1240}
        height={873}
        priority={true}
        loading="eager"
        quality={100}
        className="fixed left-0 top-0 h-screen w-screen scale-125 object-cover blur-md brightness-50"
      />
      <div className="relative aspect-[1.42] w-screen overflow-hidden md:h-auto md:w-screen lg:max-w-[1240px]">
        <Image
          src={BASE_IMAGE_URL}
          alt="Base kitchen image"
          width={1240}
          height={873}
          priority={true}
          loading="eager"
          quality={100}
          className="absolute left-0 top-0 h-full w-full object-contain"
        />
        <RenderMaterials />
        <RenderPoints points={points} />
        <Sidebar materials={materials} points={points} />
      </div>
    </main>
  );
}
