import Image from "next/image";
import { getData, getMaterials } from "~/lib/getData";
import { IoFingerPrintSharp } from "react-icons/io5";

const BASE_IMAGE_URL =
  "https://firebasestorage.googleapis.com/v0/b/visualizer-new-devs-test.appspot.com/o/base.jpeg?alt=media&token=358ccdea-3cf9-4751-ae48-4631e4700554";

export default async function HomePage() {
  const materials = await getMaterials();
  const { points } = await getData();
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
        {Object.entries(materials).map(([_point, materials]) =>
          materials.map(
            (material) =>
              material.name === "Roble Tierra" && (
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
              )
          )
        )}
        {points.map((point) => (
          <div
            className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-black/30"
            key={point.id}
            style={{
              left: `${point.coordX}%`,
              top: `${point.coordY}%`,
            }}
          >
            <IoFingerPrintSharp className="scale-125 rounded-full border-2 border-white p-1 text-white" size={35} />
          </div>
        ))}
      </div>
    </main>
  );
}
