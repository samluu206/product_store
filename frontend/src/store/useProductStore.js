import {create} from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({loading: true});
    try {
      const respone = await axios.get(`${BASE_URL}/api/products`);
      set({products: respone.data.data, error: null});
    } catch(err) {
      if (err.response?.status === 429) set({error: "Rate limit exceeded", products: []});
      else set({error: "Something went wrong", products: []});
    } finally {
      set({loading: false});
    }
  }
}));