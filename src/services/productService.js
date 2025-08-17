// src/services/productService.js

import axiosInstance from "../axiosInstance";

const productService = {
  
  getAllProductList: () => {
    return axiosInstance.get("/ProductMaster/GetAll");
  },

  getPaginatedProducts: (pageNumber, pageSize) => {
    return axiosInstance.get(`/ProductMaster/?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  },

  getProductById: (id) => {
    return axiosInstance.get(`/ProductMaster/${id}`);
  },

  createProduct: (productData) => {
    return axiosInstance.post("/ProductMaster", productData);
  },

  updateProduct: (id, productData) => {
    return axiosInstance.put(`/ProductMaster/${id}`, productData);
  },

  deleteProduct: (id) => {
    return axiosInstance.delete(`/ProductMaster/${id}`);
  }
};

export default productService;
