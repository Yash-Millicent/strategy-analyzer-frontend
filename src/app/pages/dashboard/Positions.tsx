import { useEffect, useState } from "react";
import { IContextProps, IPositionsTableData } from "../../../app/modules/auth";
import { Content } from "../../../_metronic/layout/components/content";
import DashBoardTab from "../../../_metronic/layout/components/redio-button/DashBoardTab";
import { useOutletContext } from "react-router-dom";
import { PositionsTableTab } from "../../../model/Constants";
import { useGetStrategyPosition } from "../../../hooks/queries/Positions";
import PositionsTable from "../../../_metronic/layout/components/table/PositionsTable";
// import { jwtDecode } from "jwt-decode";

const Positions = () => {
  const [selectedTabId, setSelectedTabId] = useState<string>("");
  const [tableData, setTableData] = useState<IPositionsTableData[]>([]);
  const [tableColumn, setTableColumn] = useState<any>(positionOpenColumns);
  // const [tokenExpiry, setTokenExpiry] = useState(false);
  const [{ headerData, headerType, setHeaderType }] =
    useOutletContext<IContextProps[]>();
  const [activePositionsHeader, setActivePositionsHeader] = useState<number>(0);

  const {
    data: positionsTableData,
    error,
    isLoading,
  } = useGetStrategyPosition(headerType, selectedTabId);

  useEffect(() => {
    setSelectedTabId(PositionsTableTab?.[0]?.id || "");
  }, []);

  useEffect(() => {
    setTableData(positionsTableData);
  }, [positionsTableData]);

  useEffect(() => {
    setHeaderType("ALL");
  }, []);

  // useEffect(() => {
  //   const VerifyTokenExpiry = () => {
  //     const token = localStorage.getItem("kt-auth-token-v");
  //     if (token) {
  //       const decodedToken: any = jwtDecode(token);
  //       const isTokenExpired = decodedToken.exp < Date.now() / 1000;
  //       setTokenExpiry(isTokenExpired);
  //     }
  //     console.log("tokenExpiry", tokenExpiry);
  //   };
  //   VerifyTokenExpiry();
  // }, [selectedTabId]);

  const handleTabChange = (data: string) => {
    if (data === "Open") {
      setTableColumn(positionOpenColumns);
      setSelectedTabId(data);
    } else {
      setTableColumn(positionClosedColumns);
      setSelectedTabId(data);
    }
  };

  const handleHeaderChange = (tab: any, data: any) => {
    setHeaderType(data.strategy_name);
    setActivePositionsHeader(data.id);

    // console.log("data", tab, data);
  };

  return (
    <Content>
      {/* <div>
        <DashBoardTab headerData={headerData} setHeaderType={setHeaderType} />
      </div> */}

      <div className="d-flex gap-4 flex-wrap mb-8">
        {headerData &&
          headerData.map((tab: any, index) => (
            <DashBoardTab
              data={tab}
              tabName={tab.display_name}
              eventKey={tab.id}
              handleHeaderChange={handleHeaderChange}
              activeKey={activePositionsHeader}
            />
          ))}
      </div>

      <div className="new-table-card">
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
            {PositionsTableTab?.map((data) => (
              <button
                className={`${
                  selectedTabId == data?.id ? "bg-white " : "bg-transparent "
                } fw-bold me-1 px-2 py-1 rounded border-0`}
                onClick={(e) => handleTabChange(data?.id)}
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

        <PositionsTable
          tableData={tableData}
          columns={tableColumn}
          isLoading={isLoading}
        />
      </div>
    </Content>
  );
};

export default Positions;

const positionOpenColumns = [
  {
    header: "Strategy Name",
    accessorKey: "STRATEGY",
    cell: (props: any) => <div>{props.getValue()}</div>,
    size: 200,
    alignRight: true,
  },
  {
    header: "Instrument",
    accessorKey: "INSTRUMENTNAME",
    cell: (props: any) => (
      <div className="pl-body-cell">{props.getValue()}</div>
    ),
  },
  {
    header: "Signal",
    accessorKey: "SIGNAL",
    cell: (props: any) => (
      <div className="pl-body-cell">{props.getValue()}</div>
    ),
  },
  {
    header: "Avg price",
    accessorKey: "AVG_PRICE",
    cell: (props: any) => (
      <div className="pl-body-cell">{props.getValue()}</div>
    ),
  },
  {
    header: "PL_Lot",
    accessorKey: "PL_LOT",
    cell: (props: any) => (
      <div className="pl-body-cell">{props.getValue()}</div>
    ),
  },
  {
    header: "LTP",
    accessorKey: "LTP",
    cell: (props: any) => (
      <div className="pl-body-cell">{props.getValue()}</div>
    ),
  },
  {
    header: "Entry/Time",
    accessorKey: "ENTRYTIME",
    cell: (props: any) => (
      <div className="pl-body-cell">{props.getValue()}</div>
    ),
    size: 220,
  },
];

const positionClosedColumns = [
  {
    header: "Strategy Name",
    accessorKey: "STRATEGY",
    cell: (props: any) => <div>{props.getValue()}</div>,
    size: 300,
    alignRight: true,
  },
  {
    header: "Instrument",
    accessorKey: "INSTRUMENTNAME",
    cell: (props: any) => (
      <div className="pl-body-cell">{props.getValue()}</div>
    ),
    size: 100,
  },
  {
    header: "Signal",
    accessorKey: "SIGNAL",
    cell: (props: any) => (
      <div className="pl-body-cell">{props.getValue()}</div>
    ),
    size: 100,
  },
  {
    header: "Avg price",
    accessorKey: "AVG_PRICE",
    cell: (props: any) => (
      <div className="pl-body-cell">{props.getValue()}</div>
    ),
    size: 100,
  },
  {
    header: "Exit price",
    accessorKey: "EXITPRICE",
    cell: (props: any) => (
      <div className="pl-body-cell">{props.getValue()}</div>
    ),
    size: 100,
  },
  {
    header: "PL_Lot",
    accessorKey: "PL_LOT",
    cell: (props: any) => (
      <div className="pl-body-cell">{props.getValue()}</div>
    ),
    size: 100,
  },
  {
    header: "Exit Time",
    accessorKey: "EXITTIME",
    cell: (props: any) => (
      <div className="pl-body-cell">{props.getValue()}</div>
    ),
    size: 100,
  },
  {
    header: "Entry/Time",
    accessorKey: "ENTRYTIME",
    cell: (props: any) => (
      <div className="pl-body-cell">{props.getValue()}</div>
    ),
  },
];
