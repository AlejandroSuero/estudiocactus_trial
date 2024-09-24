import { create } from "zustand";
import type { Material } from "~/types/collections";

interface MaterialStore {
  isSidebarOpen: boolean;
  selectedMaterial: Material | null;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  selectMaterial: (material: Material) => void;
}

const useStore = create<MaterialStore>()((set) => ({
  isSidebarOpen: false,
  selectedMaterial: null,

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  selectMaterial: (material: Material) => set({ selectedMaterial: material }),
}));

export default useStore;
