import { collection, getDocs } from "firebase/firestore";
import { db } from "~/configs/firebase";
import type { Materials, Points } from "~/types/collections";

/**
 * Fetch data from Firestore
 * @param collectionName - Name of the collection to fetch data from
 * @returns An array of objects representing the data from the collection
 */
async function getCollection(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function getData(): Promise<{ materials: Materials[]; points: Points[] }> {
  const materials = (await getCollection("materials")) as Materials[];
  const points = (await getCollection("points")) as Points[];
  return { materials, points };
}

export async function getMaterials(): Promise<Record<string, Materials[]>> {
  const { materials } = await getData();
  const materialsByPoint: Record<string, Materials[]> = {};
  // Group materials by point
  materials.forEach((material) => {
    material.points.forEach((point) => {
      // Initialize the point if it doesn't exist
      if (!materialsByPoint[point]) {
        materialsByPoint[point] = [];
      }
      materialsByPoint[point].push(material);
    });
  });
  return materialsByPoint;
}
