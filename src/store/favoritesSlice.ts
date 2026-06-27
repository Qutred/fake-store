import { StoreCreator } from './types';
import { FavoritesState } from './types';

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
