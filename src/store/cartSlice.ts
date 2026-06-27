import { StoreCreator } from './types';
import { CartState } from './types';

export const createCartSlice: StoreCreator<CartState> = (set) => ({
  cartItems: [],
  addToCart: (id: number) => {
    set((state) => {
      const searchItem = state.cartItems.find((item) => item.id === id);

      if (searchItem) {
        searchItem.quantity++;
      } else {
        state.cartItems.push({ id, quantity: 1 });
      }
    });
  },
});

export default createCartSlice;
