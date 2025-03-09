// store/product.js
import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        set({ products: data.data });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  addProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required" };
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (data.success) {
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product added successfully" };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      return { success: false, message: error.message };
    }
  },

  updateProduct: async (updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${updatedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (data.success) {
        set((state) => ({
          products: state.products.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          ),
        }));
        return { success: true, message: "Product updated successfully" };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: error.message };
    }
  },

  deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        set((state) => ({
          products: state.products.filter((product) => product._id !== id),
        }));
        return { success: true, message: "Product deleted successfully" };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: error.message };
    }
  },
}));
