// src/services/invoiceService.js

import axiosInstance from "../axiosInstance";

const invoiceService = {

  getAllInvoices: () => {
    return axiosInstance.get("/Invoice");
  },

  // getInvoices: (pageNumber, pageSize,filters = {}) => {
  //   return axiosInstance.get(`/Invoice/?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  // },
  getInvoices: (pageNumber, pageSize, filters = {}) => {
    return axiosInstance.get(`/Invoice`, {
    params: {
      PageNumber: pageNumber,
      PageSize: pageSize,
      customerName: filters.customerName || null,
      status: filters.status || null,
      fromDate: filters.fromDate || null,
      toDate: filters.toDate || null,
    },
  });
},

  getInvoiceById: (id) => {
    return axiosInstance.get(`/Invoice/${id}`);
  },

  createInvoice: (invoiceData) => {
    return axiosInstance.post('/Invoice', invoiceData)
  },

  updateInvoice: (id, invoiceData) => {
    return axiosInstance.put(`/Invoice/${id}`, invoiceData);
  },

  deleteInvoice: (id) => {
    return axiosInstance.delete(`/Invoice/${id}`);
  },

  generateInvoices: (generateRequest) => {
    return axiosInstance.post('/Invoice/generate', generateRequest)
  },

  getInvoiceSummary: (filterRequest) => {
    return axiosInstance.post('/Invoice/summary', filterRequest)
  }
};

export default invoiceService;
