import axios from 'axios';

const authApi = {
  login: async (username: string, password: string) => {
    const response = await axios.post<{ token: string }>(
      'https://fakestoreapi.com/auth/login',
      {
        username,
        password,
      },
    );
    return response.data;
  },
};

export default authApi;
