import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import calendar from "../../../_metronic/assets/calendar4.svg";
import { endOfDay } from "date-fns";
import moment from "moment";
import filter from "../../../_metronic/assets/filter.svg";
import { useQuery } from "react-query";
import DateRangeFilter from "../../../_metronic/layout/components/dateRangePicker/DateRangeFilter";
import {
  getStrategyLowerTable,
  getStrategyOverview,
  getTableFilterData,
} from "../../modules/auth/core/_requests";
import {
  ISelectedDate,
  ITableData,
  IContextProps,
  IFilterData,
  TSelectedData,
} from "../../../app/modules/auth";
import { useMyContext } from "../../modules/auth/core/MyContext";
import FilterModal from "../../../_metronic/layout/components/modals/FilterModal";
import { OptionType } from "../../../_metronic/layout/components/dropDown/DropDownNew";
import { useOutletContext, useParams } from "react-router-dom";
import DashBoardTab from "../../../_metronic/layout/components/redio-button/DashBoardTab";
import { Content } from "../../../_metronic/layout/components/content";
import { AnalysisRadioBtn } from "../../../model/Constants";
import RadioButton from "../../../_metronic/layout/components/radioButton/RadioButton";
import { Col, Row } from "react-bootstrap";
import BarChart from "../../../_metronic/partials/widgets/charts/BarChart";
import {
  CardsWidget17,
  ChartsWidget3,
} from "../../../_metronic/partials/widgets";
import PIeChart from "../../../_metronic/partials/widgets/_new/cards/PIeChart";
import SmallSizeCard from "../../../_metronic/partials/widgets/_new/cards/SmallSizeCard";
import AnalysisTable from "../../../_metronic/layout/components/table/AnalysisTable";
import {
  useGetAnalysisTableData,
  useGetTableFilterData,
} from "../../../hooks/queries/Analysis";

const Analysis = () => {
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [activeAnalysisHeader, setActiveAnalysisHeader] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<ISelectedDate[]>([
    {
      startDate: endOfDay(new Date()).toString(),
      endDate: endOfDay(new Date()).toString(),
      key: "selection",
    },
  ]);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [context, setContext] = useState<string>("ALL");
  const [filterData, setFilterData] = useState<IFilterData>({
    strategy_type: [],
    script: [],
    action: [],
    day: [],
  });
  const [selectedFilterData, setSelectedFilterData] = useState<TSelectedData>({
    strategy_type: { value: null, label: null },
    script: { value: null, label: null },
    action: { value: null, label: null },
    day: { value: null, label: null },
  });
  const { secondStep } = useMyContext();

  const [{ headerData, headerType, setHeaderType }] =
    useOutletContext<IContextProps[]>();

  const startDate = moment(selectedDate[0]?.startDate).format("YYYY-MM-DD");
  const endDate = moment(selectedDate[0]?.endDate).format("YYYY-MM-DD");

  // analysis global table api
  const {
    data: analysisTableData,
    isLoading: isGLobalLoading,
    isRefetching: isGlobalRefetching,
  } = useGetAnalysisTableData(
    context,
    headerType,
    startDate,
    endDate,
    selectedFilterData?.strategy_type?.value,
    selectedFilterData?.action?.value,
    selectedFilterData?.script?.value,
    selectedFilterData?.day?.value
  );

  // table filters api
  const {
    data: tableFilterData,
    isLoading: isTableFilterDataLoading,
    isError,
  } = useGetTableFilterData();

  useEffect(() => {
    const selectedHeaderID = headerData?.filter(
      (header) => header.strategy_name === headerType
    );
    if (selectedHeaderID !== undefined) {
      setActiveAnalysisHeader(selectedHeaderID?.[0]?.id);
      // console.log("data", selectedHeaderID?.[0]?.id);
    }
    // console.log("selectedHeaderID", selectedHeaderID, headerType, headerData);
  }, [headerData]);

  useEffect(() => {
    if (analysisTableData) setTableData(analysisTableData);
  }, [analysisTableData]);

  useEffect(() => {
    if (tableFilterData) {
      setFilterData((prevData) => ({
        ...prevData,
        strategy_type: tableFilterData.strategy_type,
        action: tableFilterData.action,
        script: tableFilterData.script,
        day: tableFilterData.day,
      }));
    }
  }, [tableFilterData]);

  // useEffect(() => {
  //   if (activeStrategy) {
  //     const selectedHeaderID = headerData?.filter(
  //       (header) => header.strategy_name === activeStrategy
  //     );
  //     if (selectedHeaderID !== undefined) {
  //       setActiveAnalysisHeader(selectedHeaderID?.[0]?.id);
  //     }
  //   }
  // }, [activeStrategy]);

  // save filter data
  const handleFilterSave = (selectedData: TSelectedData) => {
    setSelectedFilterData({
      strategy_type: selectedData.strategy_type,
      script: selectedData.script,
      action: selectedData.action,
      day: selectedData.day,
    });
  };

  // const handleSelectedHeaderChange = (value: {
  //   id: number;
  //   strategy_name: string;
  //   display_name: string;
  //   type: string;
  //   margin: string;
  // }) => {
  //   setSelectedFilterData((prev) => ({
  //     ...prev,
  //     strategy_type: { label: value.display_name, value: value.strategy_name },
  //   }));
  // };

  const handleSelectedRadioChange = () => {
    setSelectedFilterData((prev) => ({
      ...prev,
      action: { label: null, value: null },
    }));
  };

  // analysis table columns
  const AnalysisColumns = [
    {
      header: "ID",
      accessorKey: "id",
      cell: (props: any) => <p>{props.getValue()}</p>,
      size: 40,
    },
    {
      header: "Scrip name",
      accessorKey: "displayname",
      cell: (props: any) => <p>{props.getValue()}</p>,
      size: 160,
    },
    {
      header: "Strategy Name",
      accessorKey: "strategyname",
      cell: (props: any) => <p>{props.getValue()}</p>,
      size: 140,
    },
    {
      header: "Time frame",
      accessorKey: "timeframe",
      cell: (props: any) => (
        <p className="fw-400">
          {props.getValue() !== "NaN" ? props.getValue() : "NA"}
        </p>
      ),
      enableSorting: false,
      fontWeight: 400,
    },
    {
      header: "Buy/Sell",
      accessorKey: "buysell",
      cell: (props: any) => <p>{props.getValue()}</p>,
      enableSorting: false,
    },
    {
      header: "Exit Type",
      accessorKey: "exittype",
      cell: (props: any) => <p>{props.getValue()}</p>,
    },
    {
      header: "Signal time",
      accessorKey: "type_array.EST",
      cell: (props: any) => <p className="fw-400">{props.getValue().type1}</p>,
      enableSorting: false,
    },
    {
      header: () => (
        <div>
          <div>Target</div>
          <div>Stop loss</div>
        </div>
      ),
      accessorKey: "type_array.TS",
      cell: (props: any) => (
        <div>
          <div
            style={{ borderBottom: "1px solid #F4F5F5" }}
            className="double-row-body-cell"
          >
            {props.getValue().type1}
          </div>
          <div className="double-row-body-cell">{props.getValue().type2}</div>
        </div>
      ),
      enableSorting: false,
    },
    {
      header: (column: any) => (
        <div>
          <div>Entry time</div>
          <div>Entry price</div>
        </div>
      ),
      accessorKey: "type_array.ENTRY_TP",
      cell: (props: any) => (
        <div>
          <div
            style={{
              borderBottom: "1px solid #F4F5F5",
            }}
            className="double-row-body-cell"
          >
            {props.getValue().type2}
          </div>
          <div className="double-row-body-cell fw-400">
            {props.getValue().type1}
          </div>
        </div>
      ),
      enableSorting: false,
    },
    {
      header: (column: any) => (
        <div>
          <div>Exit price</div>
          <div>Exit time</div>
        </div>
      ),
      accessorKey: "type_array.EXIT_TP",
      cell: (props: any) => (
        <div>
          <div
            style={{
              borderBottom: "1px solid #F4F5F5",
            }}
            className="double-row-body-cell"
          >
            {props.getValue().type2}
          </div>
          <div className="double-row-body-cell fw-400">
            {props.getValue().type1}
          </div>
        </div>
      ),
      enableSorting: false,
    },
    {
      header: () => (
        <div style={{ textAlign: "right", width: "100%" }}>
          <div>P&L</div>
          <div>Absolute</div>
        </div>
      ),
      accessorKey: "pl_absolute",
      cell: (props: any) => (
        <p
          style={{
            color:
              props.getValue() === 0
                ? "black"
                : props.getValue() > 0
                ? "green"
                : "red",
          }}
        >
          {props.getValue()}
        </p>
      ),
      alignRight: true,
    },
    {
      header: () => (
        <div style={{ textAlign: "right", width: "100%" }}>
          <div>PL</div>
          <div>%</div>
        </div>
      ),
      accessorKey: "pl_percentage",
      cell: (props: any) => <p>{props.getValue()}</p>,
      alignRight: true,
      size: 60,
      sortingFn: (rowA: any, rowB: any, columnId: any, desc: boolean) => {
        const numA = Number(rowA.getValue(columnId).slice(0, -1));
        const numB = Number(rowB.getValue(columnId).slice(0, -1));
        return numA < numB ? 1 : numA > numB ? -1 : 0;
      },
    },
  ];

  const handleHeaderChange = (tab: any, data: any) => {
    setHeaderType(data.strategy_name);
    setActiveAnalysisHeader(data.id);
    setSelectedFilterData((prev) => ({
      ...prev,
      strategy_type: { label: data.display_name, value: data.strategy_name },
    }));

    // console.log("data", tab, data);
  };

  // console.log("headerType", headerType);

  return (
    <Content>
      {/* <div>
        <DashBoardTab
          headerData={headerData}
          setHeaderType={setHeaderType}
          activeStrategy={activeStrategy}
          setActiveStrategy={setActiveStrategy}
          headerType={headerType}
          handleSelectedHeaderChange={handleSelectedHeaderChange}
        />
      </div> */}

      <div className="d-flex gap-4 flex-wrap mb-5">
        {headerData &&
          headerData.map((tab: any, index) => (
            <DashBoardTab
              data={tab}
              tabName={tab.display_name}
              eventKey={tab.id}
              handleHeaderChange={handleHeaderChange}
              activeKey={activeAnalysisHeader}
            />
          ))}
      </div>

      {!secondStep && (
        <RadioButton
          radioBtnData={AnalysisRadioBtn}
          setContext={setContext}
          context={context}
          handleSelectedRadioChange={handleSelectedRadioChange}
        />
      )}

      {secondStep ? (
        <div className="mt-5">
          <ChartsWidget3 />
        </div>
      ) : (
        <>
          <Row className="mt-5">
            <Col xl={6}>
              <div style={{ height: "430px" }}>
                <BarChart
                  buyselltype={context}
                  headerType={headerType}
                />
              </div>
            </Col>

            <Col
              sm={6}
              xl={3}
              className="mt-8 mt-xl-0"
            >
              <div style={{ height: "430px" }}>
                <CardsWidget17
                  buyselltype={context}
                  headerType={headerType}
                />
              </div>
            </Col>

            <Col
              sm={6}
              xl={3}
              className="mt-8 mt-xl-0"
            >
              {/* <CardsWidget17 className="h-md-100" /> */}
              <div style={{ height: "430px" }}>
                <PIeChart />
              </div>
            </Col>
          </Row>

          <div>
            <SmallSizeCard
              context={context}
              headerType={headerType}
            />
          </div>
        </>
      )}

      <div className="new-table-card">
        <div>
          <div className="child-strategy-analyzer-table">
            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-start justify-content-sm-between mb-0 sm:mb-5">
              <div className="new-card-toolbar">
                <button
                  className={`fw-bold me-1 px-2 py-1 rounded border-0 bg-transparent cursor-pointer-disabled`}
                  data-bs-toggle="tab"
                  style={{ color: "#969ba1" }}
                >
                  List of Trades
                </button>
              </div>

              <div className="d-flex gap-3 align-items-center mt-3 mt-sm-0">
                <div
                  className="px-3 py-2 rounded-2 cursor-pointer filter-container"
                  // style={{ border: "1px solid #D1D1D1" }}
                  onClick={() => {
                    setShowModal(true);
                  }}
                  id="filter-container"
                >
                  <img
                    src={filter}
                    alt="filter"
                  />
                </div>

                <DropdownButton
                  id="dropdown-basic-button"
                  // className="dropdown-basic-button"
                  title={
                    <div className="d-flex gap-3 align-items-center">
                      <img
                        src={calendar}
                        alt="calendar"
                      />
                      <div>
                        {selectedDate[0]?.startDate == selectedDate[0]?.endDate
                          ? moment(selectedDate[0]?.startDate).format(
                              "DD/MM/YYYY"
                            )
                          : `${moment(selectedDate[0]?.startDate).format(
                              "DD/MM/YYYY"
                            )} -
                        ${moment(selectedDate[0]?.endDate).format(
                          "DD/MM/YYYY"
                        )}`}
                      </div>
                    </div>
                  }
                  bsPrefix="px-4 py-2 border-0 rounded-2"
                  style={{ backgroundColor: "white" }}
                  onToggle={() => {
                    setDropDown(!dropDown);
                  }}
                  show={dropDown}
                >
                  <Dropdown>
                    <DateRangeFilter
                      setDropDown={setDropDown}
                      setSelectedDate={setSelectedDate}
                    />
                  </Dropdown>
                </DropdownButton>
              </div>
            </div>

            <AnalysisTable
              tableData={tableData}
              columns={AnalysisColumns}
              isAnalysisDataLoading={isGLobalLoading}
              isRefetching={isGlobalRefetching}
            />
          </div>
        </div>

        <FilterModal
          showModal={showModal}
          setShowModal={setShowModal}
          headerData={headerData}
          filterData={filterData}
          handleFilterSave={handleFilterSave}
          // onClearDropdown={handleClearDropdown}
          selectedFilterData={selectedFilterData}
        />
      </div>
    </Content>
  );
};

export default Analysis;
