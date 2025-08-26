import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CSpinner,
} from '@coreui/react'

import invoiceTransactionService from '../../services/invoiceTransactionService'
const TransactionHistory = () => {
  const { id } = useParams() // get customer id from URL
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [ITEMS_PER_PAGE, setTotalRecords] = useState(20)
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await invoiceTransactionService.customerHistoryPayments(
          currentPage,
          ITEMS_PER_PAGE,
          id,
        )
        console.log(res.data.result)
        setTransactions(res.data.result)
      } catch (error) {
        console.error('Error fetching transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [id])

  if (loading) {
    return <CSpinner color="primary" />
  }

  return (
    <CCard>
      <CCardHeader>Transaction History</CCardHeader>
      <CCardBody>
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Transaction No</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>Method</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {transactions.length > 0 ? (
              transactions.map((tx, index) => (
                <CTableRow key={tx.id}>
                  <CTableDataCell>{tx.transactionNo}</CTableDataCell>
                  <CTableDataCell>{tx.transactionDate}</CTableDataCell>
                  <CTableDataCell>{tx.transactionAmount}</CTableDataCell>
                  <CTableDataCell>{tx.type}</CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan={5} className="text-center">
                  No transactions found
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default TransactionHistory
