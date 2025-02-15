import React, { useState, useEffect, useMemo } from "react";
import { ISummaryTableData } from "../../../../app/modules/auth";
import { useGetSummaryTableData } from "../../../../hooks/queries/Summary";

const StrategySummaryTable = () => {
  const [tableData, setTableData] = useState<ISummaryTableData[]>([]);

  const { data: summaryData, error, isLoading } = useGetSummaryTableData();

  useEffect(() => {
    if (summaryData) setTableData(summaryData);
  }, [summaryData]);

  return (
    <div className="new-table-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="card-number">Strategy P&L</span>
      </div>
    </div>
  );
};

export default StrategySummaryTable;
