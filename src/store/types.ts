import { StateCreator } from 'zustand';

export type FavoritesState = {
  favorites: number[];
  toggleFavorites: (id: number) => void;
};

export type CartItem = {
  id: number;
  quantity: number;
};

export type CartState = {
  cartItems: CartItem[];
  addToCart: (id: number) => void;
};

export type AppStore = FavoritesState & CartState;
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
