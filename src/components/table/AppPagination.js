import React from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'

const AppPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber)
    }
  }

  // Function to generate a small set of pages around the current page
  const generatePageNumbers = () => {
    const visiblePages = []
    const pageRange = 3 // Show 3 pages before and after the current page

    // Add pages around the current page
    for (
      let i = Math.max(1, currentPage - pageRange);
      i <= Math.min(totalPages, currentPage + pageRange);
      i++
    ) {
      visiblePages.push(i)
    }

    return visiblePages
  }

  return (
    <CPagination aria-label="Page navigation">
      <CPaginationItem
        aria-label="Previous"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        <span aria-hidden="true">First</span>
      </CPaginationItem>

      <CPaginationItem
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </CPaginationItem>

      {generatePageNumbers().map((page) => (
        <CPaginationItem
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </CPaginationItem>
      ))}

      <CPaginationItem
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </CPaginationItem>

      <CPaginationItem
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </CPaginationItem>
    </CPagination>
  )
}

export default AppPagination