import { create } from "zustand";
import { toast } from "react-hot-toast"
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set, get) => ({
  // products state
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  // form state
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "" }}),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");
      document.getElementById("add_product_modal").close();
    } catch(err) {
      console.log("Error in addProduct function", err);
      toast.error("Something went wrong in addProduction function");
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const respone = await axios.get(`${BASE_URL}/api/products`);
      set({products: respone.data.data, error: null});
    } catch(err) {
      if (err.response?.status === 429) set({error: "Rate limit exceeded", products: []});
      else set({error: "Something went wrong", products: []});
    } finally {
      set({loading: false});
    }
  },

  deleteProduct: async (id) => {
    console.log("deleteProduct", id);
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set(prev => ({ products: prev.products.filter(product => product.id !== id) }));
      toast.success("Product deleted successfully");
    } catch(error) {
      console.log("Error in deleteProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const respone = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({ currentProduct: respone.data.data,
        formData: respone.data.data,
        error: null,
       })
    } catch(err) {
      console.log("Error in product function", err);
      set({ error: "Something went wrong", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const respone = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
      set({ currentProduct: respone.data.data });
      toast.success("Product updated successfully");
    } catch(err) {
      toast.error("Error in updateProduct function", error);
    } finally {
      set({ loading: false });
    }
  },
})); 