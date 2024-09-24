import { create } from "zustand";
import type { Material, Point } from "~/types/collections";

interface MaterialStore {
  isSidebarOpen: boolean;
  selectedMaterial: Material | null;
  selectedPoint: Point | null;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  selectMaterial: (material: Material) => void;
  selectPoint: (point: Point) => void;
}

const useStore = create<MaterialStore>()((set) => ({
  isSidebarOpen: false,
  selectedMaterial: null,
  selectedPoint: null,

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  selectMaterial: (material: Material) => set({ selectedMaterial: material }),
  selectPoint: (point: Point) => set({ selectedPoint: point }),
}));

export default useStore;
