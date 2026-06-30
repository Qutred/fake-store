import { type } from 'os';
import { StateCreator } from 'zustand';

export type FavoritesState = {
  favorites: number[];
  toggleFavorites: (id: number) => void;
};

export type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
};

export type CartItem = {
  id: number;
  quantity: number;
};

export type CartState = {
  cartItems: CartItem[];
  addToCart: (id: number) => void;
  decrementQuantity: (id: number) => void;
  incrementQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

export type AppStore = FavoritesState & CartState & AuthState;
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
