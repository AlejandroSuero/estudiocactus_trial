import { collection, getDocs } from "firebase/firestore";
import { db } from "~/configs/firebase";
import type { Material, MaterialsByPoint } from "~/types/collections";

/**
 * Fetch data from Firestore
 * @param collectionName - Name of the collection to fetch data from
 * @returns An array of objects representing the data from the collection
 */
export async function getCollection(collectionName: string) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return [];
  }
}

export async function getMaterials(): Promise<MaterialsByPoint> {
  const materials = (await getCollection("materials")) as Material[];
  const materialsByPoint: Record<string, Material[]> = {};
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
