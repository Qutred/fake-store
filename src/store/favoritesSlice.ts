import { StoreCreator } from './types';

export type FavoritesState = {
  favorites: number[];
  toggleFavorites: (id: number) => void;
};

export const createFavoriteSlice: StoreCreator<FavoritesState> = (set) => ({
  favorites: [],
  toggleFavorites: (id: number) =>
    set(
      (state) => {
        if (!state.favorites.includes(id)) {
          state.favorites.push(id);
        } else {
          state.favorites = state.favorites.filter((f) => f !== id);
        }
      },
      undefined,
      'favorites:add',
    ),
});
