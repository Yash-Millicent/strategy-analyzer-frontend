// Pagination.tsx

import { Button } from 'bootstrap';
import React, { useState, useEffect } from 'react';

interface PaginationProps {
  data: any[]; // Replace 'any' with the type of your data
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleData, setVisibleData] = useState(data.slice(0, itemsPerPage));

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    const endIndex = nextPage * itemsPerPage;
    setVisibleData([...visibleData, ...data.slice(currentPage * itemsPerPage, endIndex)]);
    setCurrentPage(nextPage);
  };

  const handleRowsPerPageChange = (value: number) => {
    setCurrentPage(1);
    setVisibleData(data.slice(0, value));
  };

  useEffect(() => {
    setVisibleData(data.slice(0, itemsPerPage));
    setCurrentPage(1);
  }, [data, itemsPerPage]);

  return (
    <>
    <div>
    {/* Render your data here using the 'visibleData' state */}
    {visibleData.map((item, index) => (
      // Render each item
      <div key={index}>{/* Your item rendering logic */}</div>
    ))}

    {/* Pagination controls */}
    {currentPage < totalPages && (
      <button onClick={handleShowMore}>Show More</button>
    )}

    {/* Rows per page selection */}
    <select
      value={itemsPerPage}
      onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
    >
      <option value={5}>5 Rows per Page</option>
      <option value={10}>10 Rows per Page</option>
      <option value={20}>20 Rows per Page</option>
      {/* Add more options as needed */}
    </select>
  </div>
    </>
  
  );
};

export default Pagination;
