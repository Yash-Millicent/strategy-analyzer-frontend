import React, { useState, useEffect, useMemo } from "react";
import { ISummaryTableData, IContextProps } from "../../../app/modules/auth";
import { Content } from "../../../_metronic/layout/components/content";
import RadioButton from "../../../_metronic/layout/components/radioButton/RadioButton";
import { SummaryRadioBtn } from "../../../model/Constants";
import { useOutletContext, useNavigate } from "react-router";
import SummaryTable from "../../../_metronic/layout/components/table/SummaryTable";
import { stringToNumber } from "../../../utils/StringToNumber";
import { useGetSummaryTableData } from "../../../hooks/queries/Summary";

const Summary = () => {
  const [tableData, setTableData] = useState<ISummaryTableData[]>([]);
  const [context, setContext] = useState<string>("ALL");

  const [{ headerData, headerType, setHeaderType }] =
    useOutletContext<IContextProps[]>();

  const {
    data: summaryData,
    error: isSummaryTableError,
    isLoading: isSummaryTableLoading,
  } = useGetSummaryTableData();

  useEffect(() => {
    if (summaryData) setTableData(summaryData);
  }, [summaryData]);

  const customSort = (rowA: any, rowB: any, columnId: any, desc: boolean) => {
    if (
      rowA.original.strategy_display_name === "Total" ||
      rowB.original.strategy_display_name === "Total"
    ) {
      return 0; // Skip sorting the last row
    }

    if (columnId !== "strategy_display_name") {
      const numA = stringToNumber(rowA.getValue(columnId).type1);
      const numB = stringToNumber(rowB.getValue(columnId).type1);
      return numA < numB ? 1 : numA > numB ? -1 : 0;
    } else {
      const valueA = rowA.getValue(columnId).toLowerCase();
      const valueB = rowB.getValue(columnId).toLowerCase();
      return desc ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
    }
  };

  const summaryColumns = [
    {
      header: "Strategy Name",
      accessorKey: "strategy_display_name",
      cell: (props: any) => <div>{props.getValue()}</div>,
      // enableSorting: false,
      size: 300,
      alignRight: true,
      sortingFn: customSort,
    },
    {
      header: "Today",
      accessorKey: "today",
      cell: (props: any) => (
        <div>
          <div className="pl-body-cell">{props.getValue()?.type1}</div>
          <div className="pl-body-cell pl-percent">
            {props.getValue()?.type2 || ""}
          </div>
        </div>
      ),
      // enableSorting: false,
      size: 100,
      sortingFn: customSort,
    },
    {
      header: "Yesterday",
      accessorKey: "yesterday",
      cell: (props: any) => (
        <div>
          <div className="pl-body-cell">{props.getValue()?.type1}</div>
          <div className="pl-body-cell pl-percent">
            {props.getValue()?.type2 || ""}
          </div>
        </div>
      ),
      // enableSorting: false,
      sortingFn: customSort,
    },
    {
      header: "This week",
      accessorKey: "this_week",
      cell: (props: any) => (
        <div>
          <div className="pl-body-cell">{props.getValue()?.type1}</div>
          <div className="pl-body-cell pl-percent">
            {props.getValue()?.type2 || ""}
          </div>
        </div>
      ),
      // enableSorting: false,
      sortingFn: customSort,
    },
    {
      header: "This month",
      accessorKey: "this_month",
      cell: (props: any) => (
        <div>
          <div className="pl-body-cell">{props.getValue()?.type1}</div>
          <div className="pl-body-cell pl-percent">
            {props.getValue()?.type2 || ""}
          </div>
        </div>
      ),
      // enableSorting: false,
      sortingFn: customSort,
    },
    {
      header: "Last month",
      accessorKey: "last_month",
      cell: (props: any) => (
        <div>
          <div className="pl-body-cell">{props.getValue()?.type1}</div>
          <div className="pl-body-cell pl-percent">
            {props.getValue()?.type2 || ""}
          </div>
        </div>
      ),
      // enableSorting: false,
      sortingFn: customSort,
    },
    {
      header: "Total PL",
      accessorKey: "total_pl_lot",
      cell: (props: any) => (
        <div>
          <div className="pl-body-cell">{props.getValue()?.type1}</div>
          <div className="pl-body-cell pl-percent">
            {props.getValue()?.type2 || ""}
          </div>
        </div>
      ),
      // enableSorting: false,
      sortingFn: customSort,
    },
    {
      header: "Avg win",
      accessorKey: "avg_win",
      cell: (props: any) => <div>{props.getValue()}</div>,
      // enableSorting: false,
      // size: 40,
    },
    {
      header: "Avg loss",
      accessorKey: "avg_loss",
      cell: (props: any) => <div>{props.getValue()}</div>,
      // enableSorting: false,
      size: 80,
    },
  ];

  return (
    <Content>
      <RadioButton
        radioBtnData={SummaryRadioBtn}
        setContext={setContext}
        context={context}
      />

      <div className="new-table-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="card-number">Strategy P&L</span>
        </div>

        <SummaryTable
          tableData={tableData}
          columns={summaryColumns}
          setHeaderType={setHeaderType}
          isLoading={isSummaryTableLoading}
        />
      </div>
    </Content>
  );
};

export default Summary;
