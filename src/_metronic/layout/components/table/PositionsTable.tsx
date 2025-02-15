import React, { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Loader from "../../../helpers/components/Loader";
import { IPositionsTableProps } from "../../../../app/modules/auth";
import { recordNotFound } from "../../../../utils/recordNotFound";

const PositionsTable: React.FC<IPositionsTableProps> = ({
  tableData,
  columns,
  isLoading,
}) => {
  const [data, setData] = useState<undefined | any>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    if (tableData) setData(tableData);
  }, [tableData]);

  return (
    <>
      <div className="overflow-auto">
        {isLoading ? (
          <div className="d-flex justify-content-center my-3 ">
            <Loader />
          </div>
        ) : data.length === 0 ? (
          recordNotFound()
        ) : (
          <>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                {table.getHeaderGroups().map((headerGroup, i) => (
                  <tr
                    key={headerGroup.id}
                    style={{
                      position: i == 0 ? "sticky" : "static",
                      top: i == 0 ? 0 : "auto",
                      zIndex: i == 0 ? 100 : "auto",
                      backgroundColor: i == 0 ? "white" : "inherit",
                    }}
                  >
                    {headerGroup.headers.map((header, index) => (
                      <th
                        key={header.id}
                        className={"table-header"}
                        // className={"pl-table-header"}
                        style={{
                          textAlign:
                            index == 0
                              ? "left"
                              : index == headerGroup?.headers?.length - 1
                              ? "right"
                              : "center",
                          width:
                            header.getSize() !== 150
                              ? header.getSize()
                              : "auto",
                          padding: "8px !important",
                        }}
                      >
                        <div
                          className={`${
                            index == 0
                              ? "justify-content-start"
                              : index == headerGroup.headers.length - 1
                              ? "justify-content-end"
                              : "justify-content-center"
                          } d-flex align-items-center`}
                        >
                          <div className="d-flex gap-1 align-items-center">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row, idx) => (
                  <>
                    <tr
                      key={row.id}
                      //   className="table-data"
                      style={{
                        borderBottom: "1px solid #F4F5F5",
                        backgroundColor: "inherit",
                      }}
                    >
                      {row.getVisibleCells().map((cell: any, index) => (
                        <td
                          key={cell.id}
                          //   className="pl-table-body"
                          className="table-data"
                          style={{
                            textAlign:
                              index == 0
                                ? "left"
                                : index == row?.getVisibleCells()?.length - 1
                                ? "right"
                                : "center",
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  </>
                ))}
              </tbody>
            </table>

            {data.length === 0 && (
              <div className="d-flex justify-content-center w-100 my-3">
                No record found !!!
              </div>
            )}

            {data.length !== 0 && (
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
        )}
      </div>
    </>
  );
};

export default PositionsTable;
