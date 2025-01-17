import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  loading: false, // Add loading state
  error: null, // Add error state
  
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    set({ loading: true, error: null }); // Set loading and reset error state
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Failed to create product");

      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error(error);
      set({ error: error.message || "An error occurred." }); // Update error state
      return { success: false, message: error.message || "An error occurred." };
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  fetchProducts: async () => {
    set({ loading: true, error: null }); // Set loading and reset error state
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error(error);
      set({ error: error.message || "An error occurred." }); // Update error state
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  deleteProduct: async (pid) => {
    set({ loading: true, error: null }); // Set loading and reset error state
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      // Update the UI immediately without needing a refresh
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error(error);
      set({ error: error.message || "An error occurred." }); // Update error state
      return { success: false, message: error.message || "An error occurred." };
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    if (!updatedProduct.name || !updatedProduct.image || !updatedProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    set({ loading: true, error: null }); // Set loading and reset error state
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) throw new Error("Failed to update product");

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      // Merge existing data with updates
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? { ...product, ...data.data } : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error(error);
      set({ error: error.message || "An error occurred." }); // Update error state
      return { success: false, message: error.message || "An error occurred." };
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },
}));
