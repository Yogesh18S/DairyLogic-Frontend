import axiosInstance from '../axiosInstance'

const invoiceTransactionService = {
  invoicePayment: (pay) => {
    return axiosInstance.post('/InvoicePayments', pay)
  },
  specialRequestinvoice: (pay) => {
    return axiosInstance.post('/InvoicePayments/CreateSpecialRequest', pay)
  },
}
export default invoiceTransactionService
