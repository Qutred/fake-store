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
  decrementQuantity: (id: number) => {
    set((state) => {
      const searchItem = state.cartItems.find((item) => item.id === id);
      if (searchItem) {
        if (searchItem.quantity > 1) {
          searchItem.quantity--;
        } else {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }
      }
    });
  },
  incrementQuantity: (id: number) => {
    set((state) => {
      const searchItem = state.cartItems.find((item) => item.id === id);
      if (searchItem) {
        searchItem.quantity++;
      }
    });
  },
  removeFromCart: (id: number) => {
    set((state) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    });
  },
  clearCart: () => {
    set((state) => {
      state.cartItems = [];
    });
  },
});

export default createCartSlice;
