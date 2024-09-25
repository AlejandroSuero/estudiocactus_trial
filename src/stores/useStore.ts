import { create } from "zustand";
import type { Material, Point } from "~/types/collections";

interface MaterialStore {
  isSidebarOpen: boolean;
  selectedMaterials: Record<string, Material[]>;
  activePoint: Point | null;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  selectMaterial: (pointId: string, material: Material) => void;
  setActivePoint: (point: Point) => void;
}

const useStore = create<MaterialStore>()((set) => ({
  isSidebarOpen: false,
  selectedMaterials: {},
  activePoint: null,

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  setActivePoint: (point: Point) => set({ activePoint: point }),
  selectMaterial: (pointId: string, material: Material) => {
    set((state) => {
      return {
        selectedMaterials: {
          ...state.selectedMaterials,
          [pointId]: [material], // Overwrite the array with the newly selected material for this point
        },
      };
    });
  },
}));

export default useStore;
