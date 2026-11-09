import { create } from 'zustand';

export const useUIStore = create((set) => ({
  // Navigation / Drawer state
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Modal manager
  activeModal: null,
  modalProps: {},
  openModal: (modalName, modalProps = {}) =>
    set({ activeModal: modalName, modalProps }),
  closeModal: () => set({ activeModal: null, modalProps: {} }),

  // Quick filter / search state
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategoryId: null,
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
}));
