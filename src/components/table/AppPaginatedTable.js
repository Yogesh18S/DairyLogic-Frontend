import React, { Fragment } from 'react';
import AppTable from './AppTable';
import AppPagination from './AppPagination';

const AppPaginatedTable = ({ columns, data, totalRecords, itemsPerPage, currentPage, onPageChange, actionButtons }) => {

  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  
  return (
    <Fragment>
      <AppTable
        columns={columns}
        data={data}
        actionButtons={actionButtons}
      />
      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Fragment>
  );
};

export default AppPaginatedTable;