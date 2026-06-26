import { StateCreator } from 'zustand';
import { FavoritesState } from './favoritesSlice';

export type StoreCreator<T> = StateCreator<
  AppStore,
  [
    ['zustand/devtools', never],
    ['zustand/persist', unknown],
    ['zustand/immer', never],
  ],
  [],
  T
>;

export type AppStore = FavoritesState;
