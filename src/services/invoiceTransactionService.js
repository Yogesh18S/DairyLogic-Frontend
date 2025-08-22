import axiosInstance from '../axiosInstance'

const invoiceTransactionService = {
  invoicePayment: (pay) => {
    return axiosInstance.post('/InvoicePayments', pay)
  },
  specialRequestinvoice: (pay) => {
    return axiosInstance.post('/InvoicePayments/CreateSpecialRequest', pay)
  },
  customerHistoryPayments: (page, size, customerId) => {
    return axiosInstance.get(
      `/CustomerDetails/GetTransactionHistory?PageNumber=${page}&PageSize=${size}&customerId=${customerId}`,
    )
  },
}
export default invoiceTransactionService
