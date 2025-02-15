import React, { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import Loader from "../../../helpers/components/Loader";
import { ISummaryTableProps } from "../../../../app/modules/auth";

const SummaryTable: React.FC<ISummaryTableProps> = ({
  tableData,
  columns,
  setHeaderType,
  isLoading,
}) => {
  const data = useMemo(() => tableData, [tableData]);
  const navigate = useNavigate();

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // set header and navigate to analysis
  const handleStrategySelect = (strategy: string, index: number) => {
    if (index !== 0) return;

    if (strategy !== "Total") {
      let selectedStrategy = strategy?.split(" ")?.join("_");
      setHeaderType(selectedStrategy);
      navigate("/analysis");
      // console.log("selectedStrategy", selectedStrategy);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        <div
          className="overflow-auto"
          style={{ height: "500px" }}
        >
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <Loader />
            </div>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                {table.getHeaderGroups()?.map((headerGroup, i) => (
                  <tr
                    key={headerGroup.id}
                    style={{
                      position: i == 0 ? "sticky" : "static", // Make left column sticky
                      top: i == 0 ? 0 : "auto", // Adjust left position
                      zIndex: i == 0 ? 100 : "auto", // Set higher z-index for the sticky column
                      backgroundColor: i == 0 ? "white" : "inherit", // Ensure background color for sticky column
                    }}
                  >
                    {headerGroup.headers?.map((header, index) => (
                      <th
                        key={header.id}
                        className={"pl-table-header"}
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
                          position: index == 0 ? "sticky" : "static",
                          left: index == 0 ? 0 : "auto",
                          zIndex: index == 0 ? 1 : "auto",
                          backgroundColor: index == 0 ? "white" : "inherit",
                          padding: "8px !important",
                        }}
                      >
                        <div
                          className={`${
                            index == 0
                              ? "justify-content-start"
                              : index == headerGroup.headers?.length - 1
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

                            <div
                              className="d-flex align-items-center cursor-pointer"
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {header.column.getCanSort() &&
                                !header.column.getIsSorted() && (
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
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table
                  .getRowModel()
                  .rows?.slice(0, -1)
                  ?.map((row, idx) => (
                    <>
                      <tr
                        key={row.id}
                        // className="pl-table-body"
                        style={{
                          borderBottom: "1px solid #F4F5F5",
                          backgroundColor: "inherit",
                        }}
                      >
                        {row.getVisibleCells()?.map((cell: any, index) => (
                          <td
                            key={cell.id}
                            className={`${
                              index === 0 ? "pointer-cell" : ""
                            } pl-table-body`}
                            style={{
                              textAlign:
                                index == 0
                                  ? "left"
                                  : index == row?.getVisibleCells()?.length - 1
                                  ? "right"
                                  : "center",
                              position: index == 0 ? "sticky" : "static",
                              left: index == 0 ? 0 : "auto",
                              zIndex: index == 0 ? 1 : "auto",
                              backgroundColor: cell.getContext().getValue()
                                ?.color
                                ? cell.getContext().getValue()?.color
                                : index == 0
                                ? "white"
                                : "inherit",
                            }}
                            onClick={() =>
                              handleStrategySelect(
                                cell.getContext().row.original?.strategy_name,
                                index
                              )
                            }
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
              {table
                .getRowModel()
                .rows?.slice(-1)
                ?.map((row, idx) => (
                  <>
                    <tr
                      key={row.id}
                      // className="pl-table-body"
                      style={{
                        backgroundColor: "#D1D1D1",
                      }}
                    >
                      {row.getVisibleCells()?.map((cell: any, index) => (
                        <td
                          key={cell.id}
                          className={`pl-table-body`}
                          style={{
                            textAlign:
                              index == 0
                                ? "left"
                                : index == row?.getVisibleCells()?.length - 1
                                ? "right"
                                : "center",
                            position: index == 0 ? "sticky" : "static",
                            left: index == 0 ? 0 : "auto",
                            zIndex: index == 0 ? 1 : "auto",
                            backgroundColor: cell.getContext().getValue()?.color
                              ? cell.getContext().getValue()?.color
                              : index == 0
                              ? "white"
                              : "inherit",
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
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default SummaryTable;
