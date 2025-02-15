import React, { useEffect, useState } from "react";
import TableTabs from "./TableTabs";
import TableWithPagination from "../tableWithPagination/TableWithPagination";
import {
  IPositionTableProps,
  IPositionsTableData,
  ISummaryTableData,
  ITableData,
} from "../../../../app/modules/auth";
import Loader from "../../../helpers/components/Loader";
import { useGetStrategyPosition } from "../../../../hooks/queries/Positions";

function isPositionData(
  val: IPositionsTableData[] | ITableData[] | ISummaryTableData[]
): val is IPositionsTableData[] {
  return true;
}

const StrategyPositionsTable: React.FC<IPositionTableProps> = ({
  selectedTab,
  headerType,
}) => {
  const dummyData = [
    {
      id: 1,
      strategy_name: "straddle",
      array_data: [
        {
          instrument: "instrument1",
          signal: "signal1",
          contracts: "contracts1",
          avg_price: "avg_price1",
          ltp: "ltp1",
          mtm_profit: "mtm_profit1",
          date_time: "date_time1",
        },
        {
          instrument: "instrument2",
          signal: "signal2",
          contracts: "contracts2",
          avg_price: "avg_price2",
          ltp: "ltp1",
          mtm_profit: "mtm_profit2",
          date_time: "date_time2",
        },
      ],
      contract: 1,
      cum_profit: "-59.25 INR -0.28%",
    },
    {
      id: 2,
      strategy_name: "Scalping",
      array_data: [
        {
          instrument: "instrument1",
          signal: "signal1",
          contracts: "contracts1",
          avg_price: "avg_price1",
          ltp: "ltp1",
          mtm_profit: "mtm_profit1",
          date_time: "date_time1",
        },
        {
          instrument: "instrument2",
          signal: "signal2",
          contracts: "contracts2",
          avg_price: "avg_price2",
          ltp: "ltp1",
          mtm_profit: "mtm_profit2",
          date_time: "date_time2",
        },
        {
          instrument: "instrument3",
          signal: "signal3",
          contracts: "contracts3",
          avg_price: "avg_price3",
          ltp: "ltp3",
          mtm_profit: "mtm_profit3",
          date_time: "date_time3",
        },
      ],
      contract: 1,
      cum_profit: "-59.25 INR -0.28%",
    },
    {
      id: 3,
      strategy_name: "Strangle",
      array_data: [
        {
          instrument: "instrument1",
          signal: "signal1",
          contracts: "contracts1",
          avg_price: "avg_price1",
          ltp: "ltp1",
          mtm_profit: "mtm_profit1",
          date_time: "date_time1",
        },
        {
          instrument: "instrument2",
          signal: "signal2",
          contracts: "contracts2",
          avg_price: "avg_price2",
          ltp: "ltp1",
          mtm_profit: "mtm_profit2",
          date_time: "date_time2",
        },
        {
          instrument: "instrument3",
          signal: "signal3",
          contracts: "contracts3",
          avg_price: "avg_price3",
          ltp: "ltp3",
          mtm_profit: "mtm_profit3",
          date_time: "date_time3",
        },
        {
          instrument: "instrument4",
          signal: "signal4",
          contracts: "contracts4",
          avg_price: "avg_price4",
          ltp: "ltp4",
          mtm_profit: "mtm_profit4",
          date_time: "date_time4",
        },
      ],
      contract: 1,
      cum_profit: "-59.25 INR -0.28%",
    },
    {
      id: 4,
      strategy_name: "Strangle",
      array_data: [
        {
          instrument: "instrument1",
          signal: "signal1",
          contracts: "contracts1",
          avg_price: "avg_price1",
          ltp: "ltp1",
          mtm_profit: "mtm_profit1",
          date_time: "date_time1",
        },
        // {
        //   instrument: "instrument2",
        //   signal: "signal2",
        //   contracts: "contracts2",
        //   avg_price: "avg_price2",
        //   ltp: "ltp1",
        //   mtm_profit: "mtm_profit2",
        //   date_time: "date_time2",
        // },
        // {
        //   instrument: "instrument3",
        //   signal: "signal3",
        //   contracts: "contracts3",
        //   avg_price: "avg_price3",
        //   ltp: "ltp3",
        //   mtm_profit: "mtm_profit3",
        //   date_time: "date_time3",
        // },
        // {
        //   instrument: "instrument4",
        //   signal: "signal4",
        //   contracts: "contracts4",
        //   avg_price: "avg_price4",
        //   ltp: "ltp4",
        //   mtm_profit: "mtm_profit4",
        //   date_time: "date_time4",
        // },
      ],
      contract: 1,
      cum_profit: "-59.25 INR -0.28%",
    },
  ];
  const [selectedTabId, setSelectedTabId] = useState<string>("");
  const [tableData, setTableData] = useState<IPositionsTableData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [paginatedData, setPaginatedData] =
    useState<IPositionsTableData[]>(tableData);
  const [sortedData, setSortedData] = useState(paginatedData);
  const [visibleData, setVisibleData] = useState<number | undefined>(10);
  4;
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data: positionsTableData,
    error,
    isLoading,
  } = useGetStrategyPosition(headerType, selectedTabId);

  // console.log("positionsTableData", positionsTableData, selectedTabId);

  useEffect(() => {
    setSelectedTabId(tabs?.[0]?.id || "");
  }, [selectedTab]);

  useEffect(() => {
    setSortedData(tableData);
  }, [tableData]);

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchData = async () => {
  //     const response = await getStrategyPosition(headerType, selectedTabId);
  //     setTableData(response);
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, [headerType, selectedTabId]);

  useEffect(() => {
    setTableData(positionsTableData);
  }, [positionsTableData]);

  const tabs =
    selectedTab === "Analysis"
      ? TableTabs.tabsForAnalysisScreen
      : TableTabs.tabsForPositionsScreen;
  const yourData = dummyData; /* Your data array */
  const itemsPerPage = 5; // Initial items per page
  const calculatePossibleOptions = (totalItems: number) => {
    const options: number[] = [];
    for (let i = 5; i <= totalItems; i += 5) {
      options.push(i);
    }
    return options;
  };

  const handleSetPaginatedData = (
    val: IPositionsTableData[] | ITableData[] | ISummaryTableData[]
  ) => {
    if (isPositionData(val)) {
      setPaginatedData(val);
    }
  };

  // console.log("analyse", paginatedData);

  return (
    <div className="new-table-card">
      <div>
        <div className="child-strategy-analyzer-table">
          <div className="d-flex">
            <div
              className="d-flex align-items-center mb-5"
              style={{
                backgroundColor: "#f0f0f0",
                width: "fit-content",
                padding: "4px",
                borderRadius: "4px",
              }}
            >
              {tabs?.map(data => (
                <button
                  className={`${
                    selectedTabId == data?.id ? "bg-white " : "bg-transparent "
                  } fw-bold me-1 px-2 py-1 rounded border-0`}
                  onClick={e => setSelectedTabId(data?.id)}
                  data-bs-toggle="tab"
                  style={{
                    color: selectedTabId == data?.id ? "#41414e" : "#969ba1",
                  }}
                >
                  {data?.name}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="d-flex justify-content-center">
              <Loader />
            </div>
          ) : (
            <div className="strategy-position-table-wrapper">
              <table className="strategy-position-table">
                <thead>
                  <tr>
                    <th className="table-header">Strategy Name</th>
                    <th className="table-header">Instrument</th>
                    <th className="table-header">Signal</th>
                    {/* <th className="table-header">Contracts</th> */}
                    <th className="table-header">Avg Price</th>

                    <th className="table-header">PL_Lot</th>
                    {selectedTabId == "Open" && (
                      <th className="table-header">LTP</th>
                    )}
                    {selectedTabId == "Closed" && (
                      <th className="table-header">Exit Price</th>
                    )}
                    {selectedTabId == "Closed" && (
                      <th className="table-header">Exit Time</th>
                    )}
                    <th className="table-header">Date/Time</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedData?.map((val, i) => (
                    <>
                      <tr
                        className="table-data"
                        style={{ borderBottom: "1px solid #F4F5F5" }}
                      >
                        <td
                          // rowSpan={val.array_data.length}
                          className=" table-body-cell"
                          style={{
                            borderBottom:
                              i == dummyData.length - 1
                                ? ""
                                : "1px solid #F4F5F5",
                          }}
                        >
                          {val.STRATEGY}
                        </td>
                        <td className="py-4 table-body-cell">
                          {val.INSTRUMENTNAME}
                        </td>
                        <td className="py-4 table-body-cell">{val.SIGNAL}</td>
                        {/* <td className="py-4 table-body-cell">{val.CONTRACT}</td> */}
                        <td className="py-4 table-body-cell">
                          {val.AVG_PRICE}
                        </td>

                        {selectedTabId == "Open" && (
                          <td className="py-4 table-body-cell">{val.LTP}</td>
                        )}
                        <td className="py-4 table-body-cell">{val.PL_LOT}</td>
                        {selectedTabId == "Closed" && (
                          <td className="py-4 table-body-cell">
                            {val.EXITPRICE}
                          </td>
                        )}
                        {selectedTabId == "Closed" && (
                          <th className="py-4 table-body-cell">
                            {val.EXITTIME}
                          </th>
                        )}
                        <td className="py-4 table-body-cell">
                          {val.ENTRYTIME}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>

                {/* <Pagination data={yourData} itemsPerPage={itemsPerPage} /> */}
              </table>
            </div>
          )}

          <TableWithPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            paginatedData={paginatedData}
            setPaginatedData={handleSetPaginatedData}
            data={sortedData}
            itemsPerPage={visibleData ? visibleData : 10}
            setVisibleData={setVisibleData}
            visibleData={visibleData}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
export default StrategyPositionsTable;
