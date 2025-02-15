import React, { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Loader from "../../../helpers/components/Loader";
import { AnalysisTableProps } from "../../../../app/modules/auth";

const AnalysisTable = ({
  tableData,
  columns,
  isAnalysisDataLoading,
  isRefetching,
}: AnalysisTableProps) => {
  const [data, setData] = useState<undefined | any>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    if (tableData) setData(tableData);
  }, [tableData]);

  return (
    <div className="p-2">
      <>
        <div className="analysis-table-wrapper">
          <table className="analysis-table">
            <thead>
              {table.getHeaderGroups()?.map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers?.map((header, index) => (
                    <th
                      key={header.id}
                      className={"table-header"}
                      style={{
                        textAlign: columns[index]?.alignRight
                          ? "right"
                          : "left",
                        // width: columns?.width || "auto",
                        width:
                          header.getSize() !== 150 ? header.getSize() : "auto",
                      }}
                    >
                      <div className="d-flex gap-1 align-items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                        <div
                          className="d-flex align-items-center cursor-pointer"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {header.column.getCanSort() &&
                            !header.column.getIsSorted() &&
                            data.length > 1 && (
                              <div>
                                <i
                                  className="bi bi-arrow-down-up"
                                  style={{ fontSize: "10px" }}
                                ></i>
                              </div>
                            )}
                          {{
                            asc: (
                              <i
                                className="bi bi-arrow-down"
                                style={{ fontSize: "10px" }}
                              ></i>
                            ),
                            desc: (
                              <i
                                className="bi bi-arrow-up"
                                style={{ fontSize: "10px" }}
                              ></i>
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {isAnalysisDataLoading ? (
              <tr>
                <td colSpan={12}>
                  <div className="d-flex justify-content-center my-3">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : (
              <tbody>
                {table.getRowModel().rows?.map((row) => (
                  <tr
                    key={row.id}
                    className={"table-data"}
                    style={{ borderBottom: "1px solid #F4F5F5" }}
                  >
                    {row.getVisibleCells()?.map((cell, index) => (
                      <td
                        key={cell.id}
                        style={{
                          textAlign: columns[index]?.alignRight
                            ? "right"
                            : "left",
                          width: columns?.width || "auto",
                          padding: "4px",
                          fontWeight: columns.fontWeight || 600,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        {data?.length === 0 && !isAnalysisDataLoading && (
          <div className="d-flex justify-content-center w-100">
            No record found !!!
          </div>
        )}

        {data?.length !== 0 && (
          <div className="d-flex flex-column flex-sm-row gap-6 align-items-start align-items-sm-center mt-2 mt-sm-12 justify-content-start justify-content-sm-end mb-0 mb-sm-3">
            <div className="d-flex gap-2">
              <div>Rows per page</div>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {<div> Rows per Page</div>}
                {[50, 40, 30, 20, 10].map((pageSize) => (
                  <option
                    key={pageSize}
                    value={pageSize}
                  >
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex align-items-center gap-4">
              Page {table.getState()?.pagination?.pageIndex + 1} of{" "}
              {table.getPageCount()}
              <button
                className="pagination-btn"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                className="pagination-btn"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default AnalysisTable;
