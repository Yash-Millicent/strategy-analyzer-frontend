// TableWithPagination.tsx

import React, { useState, useEffect } from "react";
import {
  IPositionsTableData,
  ISummaryTableData,
  ITableData,
} from "../../../../app/modules/auth";

interface TableRow {
  id: number;
  name: string;
  // Add other table row properties as needed
}

interface TableWithPaginationProps {
  data: ITableData[] | IPositionsTableData[] | ISummaryTableData[];
  itemsPerPage: number;
  currentPage: number;
  visibleData: number | undefined;
  setCurrentPage: (value: number) => void;
  totalPages: number;
  setTotalPages: (value: number) => void;
  paginatedData: ITableData[] | IPositionsTableData[] | ISummaryTableData[];
  setPaginatedData: (
    value: ITableData[] | IPositionsTableData[] | ISummaryTableData[]
  ) => void;
  setVisibleData: (val: number) => void;
  loading: boolean;
}

const TableWithPagination: React.FC<TableWithPaginationProps> = ({
  data,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  paginatedData,
  setPaginatedData,
  visibleData,
  setVisibleData,
  loading,
}) => {
  useEffect(() => {
    setTotalPages(Math?.ceil(data?.length / itemsPerPage));
  }, [data, itemsPerPage]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const pageData = data?.slice(startIndex, endIndex);
    // console.log("pg", pageData);
    setPaginatedData(pageData);
  }, [data, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (value: number) => {
    setVisibleData(value);
  };

  const paginationProps = [
    {
      rowsPerPageOptions: "10",
    },
    {
      rowsPerPageOptions: "20",
    },
    {
      rowsPerPageOptions: "30",
    },
    {
      rowsPerPageOptions: "40",
    },
    {
      rowsPerPageOptions: "50",
    },
  ];

  // const pagination=paginationProps?.map((data)=>data)
  return (
    <div>
      <div className="d-flex gap-6 justify-content-end mt-6">
        <div
          className="d-flex"
          style={{ gap: "inherit", alignItems: "center" }}
        >
          {currentPage < totalPages && <div> Rows per Page</div>}
          <select
            value={itemsPerPage}
            onChange={(e) => {
              handleRowsPerPageChange(Number(e.target.value));
            }}
          >
            {paginationProps?.map((data, i) => (
              <option
                value={visibleData ? data?.rowsPerPageOptions : itemsPerPage}
                key={i}
              >
                {data?.rowsPerPageOptions}
              </option>
            ))}
          </select>
        </div>
        <button
          className="h-30px w-95px"
          style={{
            borderRadius: "8px",
            cursor: "pointer",
            border: " 1px solid lightgray",
          }}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span
          className="d-flex"
          style={{ alignItems: "center" }}
        >{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="h-30px w-95px "
          style={{
            borderRadius: "8px",
            cursor: "pointer",
            border: " 1px solid lightgray",
          }}
          disabled={currentPage === totalPages || loading === true}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableWithPagination;
