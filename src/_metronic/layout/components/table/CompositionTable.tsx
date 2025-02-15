import React, { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const CompositionTable = () => {
  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "CMP",
      accessorKey: "cmp",
    },
    {
      header: "Change%",
      accessorKey: "change",
    },
  ];

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div className="overflow-auto">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup, i) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={"pl-table-header"}
                    style={{
                      // textAlign: columns[index].alignRight ? "right" : "center",
                      textAlign:
                        index == headerGroup?.headers?.length - 1
                          ? "right"
                          : "left",
                      width:
                        header.getSize() !== 150 ? header.getSize() : "auto",
                      //   position: index == 0 ? "sticky" : "static",
                      //   left: index == 0 ? 0 : "auto",
                      //   zIndex: index == 0 ? 1 : "auto",
                      backgroundColor: index == 0 ? "white" : "inherit",
                      padding: "8px !important",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                  // className="pl-table-body"
                  style={{
                    borderBottom: "1px solid #F4F5F5",
                    backgroundColor: "inherit",
                  }}
                >
                  {row.getVisibleCells().map((cell: any, index) => (
                    <td
                      key={cell.id}
                      className={`pl-table-body`}
                      style={{
                        textAlign:
                          index == row?.getVisibleCells()?.length - 1
                            ? "right"
                            : "left",
                        //   position: index == 0 ? "sticky" : "static",
                        //   left: index == 0 ? 0 : "auto",
                        //   zIndex: index == 0 ? 1 : "auto",
                        //   backgroundColor: cell.getContext().getValue()?.color
                        //     ? cell.getContext().getValue()?.color
                        //     : index == 0
                        //     ? "white"
                        //     : "inherit",
                        padding: "8px",
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
      </div>
    </>
  );
};

export default CompositionTable;

const data = [
  {
    name: "Nuveen New York AMT-Free Quality Municipal",
    cmp: 5521,
    change: 17.42,
  },
  {
    name: "First Trust NASDAQ-100 Ex-Technology Sector Index Fund",
    cmp: 15935,
    change: 22.91,
  },
  {
    name: "Intra-Cellular Therapies Inc.",
    cmp: 4538,
    change: 19.9,
  },
  {
    name: "Fortress Transportation and Infrastructure Investors LLC",
    cmp: 17448,
    change: 6.64,
  },
  {
    name: "Travelzoo",
    cmp: 11061,
    change: 14.06,
  },
  {
    name: "Nuven Mortgage Opportunity Term Fund 2",
    cmp: 14827,
    change: 2.4,
  },
  {
    name: "Teligent, Inc.",
    cmp: 8155,
    change: 24.96,
  },
  {
    name: "State Street Corporation",
    cmp: 14080,
    change: 15.24,
  },
  {
    name: "Upland Software, Inc.",
    cmp: 2973,
    change: 3.32,
  },
  {
    name: "Blue Hills Bancorp, Inc.",
    cmp: 7095,
    change: 23.48,
  },
  {
    name: "Zumiez Inc.",
    cmp: 6836,
    change: 13.69,
  },
  {
    name: "Duff & Phelps Utilities Tax-Free Income, Inc.",
    cmp: 12682,
    change: 18.04,
  },
  {
    name: "Cincinnati Bell Inc",
    cmp: 14740,
    change: 4.51,
  },
  {
    name: "Compugen Ltd.",
    cmp: 13037,
    change: 7.62,
  },
  {
    name: "DineEquity, Inc",
    cmp: 11027,
    change: 29.56,
  },
  {
    name: "First Trust International IPO ETF",
    cmp: 16270,
    change: 19.39,
  },
  {
    name: "Tactile Systems Technology, Inc.",
    cmp: 1206,
    change: 7.23,
  },
  {
    name: "Apollo Global Management, LLC",
    cmp: 9873,
    change: 10.17,
  },
  {
    name: "Albemarle Corporation",
    cmp: 10391,
    change: 9.36,
  },
  {
    name: "Mechel PAO",
    cmp: 19524,
    change: 20.71,
  },
];
