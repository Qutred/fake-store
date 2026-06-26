import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createFavoriteSlice } from './favoritesSlice';
import { AppStore } from './types';

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      immer((...args) => ({
        ...createFavoriteSlice(...args),
      })),
      {
        name: 'app-storage',
        partialize: (state) => ({
          favorites: state.favorites,
        }),
      },
    ),
  ),
);
