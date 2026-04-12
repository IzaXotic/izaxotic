import { create } from "zustand";

interface AppState {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
  portfolioFilter: string;
  setPortfolioFilter: (f: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  setIsLoading: (v) => set({ isLoading: v }),
  activeSection: "home",
  setActiveSection: (s) => set({ activeSection: s }),
  portfolioFilter: "all",
  setPortfolioFilter: (f) => set({ portfolioFilter: f }),
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (v) => set({ isMobileMenuOpen: v }),
}));
