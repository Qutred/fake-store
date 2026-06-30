import { StoreCreator } from './types';
import { AuthState } from './types';

export const createAuthteSlice: StoreCreator<AuthState> = (set) => ({
  token: null,
  isAuthenticated: false,
  login: (token: string) =>
    set(
      (state) => {
        state.token = token;
        state.isAuthenticated = true;
      },
      undefined,
      'auth:login',
    ),
});
