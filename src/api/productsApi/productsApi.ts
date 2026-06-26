import { apiClient } from '@/settings/axios/apiClient';
import { Product } from '@/types/product';

const productsApi = {
  async getProducts() {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  },
  async getProduct(id: number) {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },
  async addProduct(product: Partial<Product>) {
    const response = await apiClient.post<Product>('/products', product);
    return response.data;
  },
  async updateProduct(id: number, product: Partial<Product>) {
    const response = await apiClient.put<Product>(`/products/${id}`, product);
    return response.data;
  },
  async deleteProduct(id: number) {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};

export default productsApi;
