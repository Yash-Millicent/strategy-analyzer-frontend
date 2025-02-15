// import { DiffieHellman } from "crypto";
// import React, { useEffect, useState } from "react";
// import DateRangeFilter from "../dateRangePicker/DateRangeFilter";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import {
//   getStrategyOverview,
//   getTableFilterData,
// } from "../../../../app/modules/auth/core/_requests";
// import {
//   ITableData,
//   ISelectedDate,
//   IStretagyHeader,
//   IPositionsTableData,
//   ISummaryTableData,
// } from "../../../../app/modules/auth";
// import TableWithPagination from "../tableWithPagination/TableWithPagination";
// import { useMyContext } from "../../../../app/modules/auth/core/MyContext";
// import Loader from "../../../helpers/components/Loader";
// import calendar from "../../../assets/calendar4.svg";
// import { endOfDay } from "date-fns";
// import moment from "moment";
// import filter from "../../../assets/filter.svg";
// import FilterModal from "../modals/FilterModal";
// import { useQuery } from "react-query";
// import { OptionType } from "../dropDown/DropDownNew";

// interface ITableModel {
//   context: string;
//   headerType: string;
//   headerData: IStretagyHeader[] | null;
// }
// interface DateRange {
//   startDate: string;
//   endDate: string;
//   key: string;
// }
// // React.FC<ISmallSizeCard> = ({ context }) => {

// function isStrategyTableData(
//   val: IPositionsTableData[] | ITableData[] | ISummaryTableData[]
// ): val is ITableData[] {
//   return true;
// }

// const StrategyAnalyserTable: React.FC<ITableModel> = ({
//   context,
//   headerType,
//   headerData,
// }) => {
//   const [selectedTab, setSelectedTab] = useState<string>("Overview");
//   const [tableData, setTableData] = useState<ITableData[]>([]);
//   const [sortColumn, setSortColumn] = useState("");
//   const [paginatedData, setPaginatedData] = useState<ITableData[]>(tableData);
//   const [sortedData, setSortedData] = useState(paginatedData);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [sortingId, setSortingId] = useState<boolean>();
//   const [selectedDate, setSelectedDate] = useState<ISelectedDate[]>([
//     {
//       startDate: endOfDay(new Date()).toString(),
//       endDate: endOfDay(new Date()).toString(),
//       key: "selection",
//     },
//   ]);
//   const [dropDown, setDropDown] = useState<boolean>(false);
//   const [visibleData, setVisibleData] = useState<number | undefined>(50);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [strategy, setStrategy] = useState<OptionType[]>([]);
//   const [scrip, setScrip] = useState<OptionType[]>([]);
//   const [action, setAction] = useState<OptionType[]>([]);
//   const [day, setDay] = useState<OptionType[]>([]);
//   const [selectedStrategy, setSelectedStrategy] = useState<
//     OptionType | undefined
//   >(undefined);
//   const [selectedScrip, setSelectedScrip] = useState<OptionType | undefined>(
//     undefined
//   );
//   const [selectedAction, setSelectedAction] = useState<OptionType | undefined>(
//     undefined
//   );
//   const [selectedDay, setSelectedDay] = useState<OptionType | undefined>(
//     undefined
//   );
//   const [filterApply, setFilterApply] = useState<boolean>(false);

//   const startDate = moment(selectedDate[0]?.startDate).format("YYYY-MM-DD");
//   const endDate = moment(selectedDate[0]?.endDate).format("YYYY-MM-DD");

//   let selectedheader = filterApply
//     ? selectedStrategy?.value || headerType
//     : headerType;
//   let radioBtnAction = filterApply ? selectedAction?.value || context : context;

//   // console.log("context", typeof radioBtnAction, radioBtnAction);

//   const {
//     data: analysisTableData,
//     error,
//     isLoading,
//     refetch,
//   } = useQuery(
//     ["analysisTableData", radioBtnAction, selectedheader, startDate, endDate],
//     () =>
//       getStrategyOverview(
//         radioBtnAction,
//         selectedheader,
//         startDate,
//         endDate,
//         selectedScrip?.value,
//         selectedDay?.value
//       ),
//     {
//       refetchOnMount: true,
//       refetchOnWindowFocus: true,
//     }
//   );

//   // console.log("analysis", analysisTableData);

//   // const dateRanges: DateRange[] | undefined = selectedDate;
//   const { secondStep } = useMyContext();
//   useEffect(() => {
//     setSortedData(tableData);
//   }, [tableData]);

//   // console.log("pd", paginatedData);

//   // useEffect(() => {
//   //   setLoading(true);
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await getStrategyOverview(
//   //         context,
//   //         headerType,
//   //         startDate,
//   //         endDate
//   //       );
//   //       setTableData(response);
//   //       setLoading(false);
//   //     } catch (err) {
//   //       console.log(err);
//   //     }
//   //   };
//   //   fetchData();
//   // }, [context, headerType, startDate, endDate]);

//   useEffect(() => {
//     if (analysisTableData) setTableData(analysisTableData);
//   }, [analysisTableData]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await getTableFilterData();
//       setStrategy(response.strategy_type);
//       setScrip(response.script);
//       setAction(response.action);
//       setDay(response.day);
//     };

//     fetchData();
//   }, []);

//   const data = tableData;

//   const handleSort = (columnName: string) => {
//     // Toggle between ascending and descending order
//     const newSortOrder = sortColumn === columnName ? !sortingId : true;
//     // console.log(newSortOrder, "sdafdsgf");

//     setSortingId(newSortOrder);

//     // setSortingId(columnName);
//     let sorted;

//     if (sortColumn === columnName) {
//       // If already sorted by the same column, reverse the order
//       sorted = [...sortedData]?.reverse();
//     } else {
//       // Sort the data based on the selected column and sorting order
//       switch (columnName) {
//         case "cum_profit":
//           sorted = [...sortedData].sort(
//             (a, b) =>
//               (parseFloat(a.cum_profit) - parseFloat(b.cum_profit)) *
//               (newSortOrder ? 1 : -1)
//           );
//           break;
//         default:
//           sorted = [...sortedData];
//       }
//     }

//     setSortedData(sorted);
//     setSortColumn(columnName);
//   };

//   const handleSetPaginatedData = (
//     val: IPositionsTableData[] | ITableData[] | ISummaryTableData[]
//   ) => {
//     if (isStrategyTableData(val)) {
//       setPaginatedData(val);
//     }
//   };

//   const handleStrategyChange = (options: OptionType) => {
//     setSelectedStrategy(options);
//   };

//   const handleScripChange = (options: OptionType) => {
//     setSelectedScrip(options);
//   };
//   const handleActionChange = (options: OptionType) => {
//     setSelectedAction(options);
//   };
//   const handleDayChange = (options: OptionType) => {
//     setSelectedDay(options);
//   };

//   // console.log(
//   //   "selectedStrategy",
//   //   selectedStrategy,
//   //   selectedScrip,
//   //   selectedAction,
//   //   selectedDay
//   // );

//   const handleFilterSave = () => {
//     refetch();
//   };

//   const handleFilterCancel = () => {
//     setSelectedStrategy(undefined);
//     setSelectedScrip(undefined);
//     setSelectedAction(undefined);
//     setSelectedDay(undefined);
//   };

//   return (
//     <div className="new-table-card">
//       <div>
//         <div className="child-strategy-analyzer-table">
//           <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5">
//             <div className="new-card-toolbar mb-5 mb-md-0 flex-wrap flex-md-nowrap">
//               {/* <button
//                 className={`${
//                   selectedTab === "Overview" ? "bg-white " : "bg-transparent "
//                 } fw-bold me-1 px-2 py-1 rounded border-0 `}
//                 data-bs-toggle="tab"
//                 onClick={(e) => setSelectedTab("Overview")}
//                 style={{
//                   color: selectedTab == "Overview" ? "#41414e" : "#969ba1",
//                 }}
//               >
//                 Overview
//               </button> */}

//               {/* <button
//                 className={`${
//                   selectedTab === "Performance summary"
//                     ? "bg-white "
//                     : "bg-transparent "
//                 } fw-bold me-1 px-2 py-1 rounded border-0`}
//                 onClick={(e) => setSelectedTab("Performance summary")}
//                 data-bs-toggle="tab"
//                 style={{
//                   color:
//                     selectedTab == "Performance summary"
//                       ? "#41414e"
//                       : "#969ba1",
//                 }}
//               >
//                 Performance summary
//               </button> */}

//               <button
//                 className={`fw-bold me-1 px-2 py-1 rounded border-0 bg-transparent `}
//                 // onClick={(e) => setSelectedTab("List of Trades")}
//                 data-bs-toggle="tab"
//                 style={{
//                   color: "#969ba1",
//                 }}
//               >
//                 List of Trades
//               </button>

//               {/* <button
//                 className={`${
//                   selectedTab === "Properties" ? "bg-white" : "bg-transparent"
//                 } fw-bold me-1 px-2 py-1 rounded border-0`}
//                 onClick={(e) => setSelectedTab("Properties")}
//                 data-bs-toggle="tab"
//                 style={{
//                   color: selectedTab == "Properties" ? "#41414e" : "#969ba1",
//                 }}
//               >
//                 Properties
//               </button> */}
//             </div>

//             <div className="d-flex gap-3 align-items-center">
//               <div
//                 className="px-3 py-2 rounded-2 cursor-pointer filter-container"
//                 // style={{ border: "1px solid #D1D1D1" }}
//                 onClick={() => {
//                   setShowModal(true);
//                   // console.log("clicked");
//                 }}
//               >
//                 <img
//                   src={filter}
//                   alt="filter"
//                 />
//               </div>

//               <DropdownButton
//                 id="dropdown-basic-button"
//                 // className="dropdown-basic-button"
//                 title={
//                   <div className="d-flex gap-3 align-items-center">
//                     <img
//                       src={calendar}
//                       alt="calendar"
//                     />
//                     <div>
//                       {selectedDate[0]?.startDate == selectedDate[0]?.endDate
//                         ? moment(selectedDate[0]?.startDate).format(
//                             "DD/MM/YYYY"
//                           )
//                         : `${moment(selectedDate[0]?.startDate).format(
//                             "DD/MM/YYYY"
//                           )} -
//                         ${moment(selectedDate[0]?.endDate).format(
//                           "DD/MM/YYYY"
//                         )}`}
//                     </div>
//                   </div>
//                 }
//                 bsPrefix="px-4 py-2 border-0 rounded-2"
//                 style={{ backgroundColor: "white" }}
//                 onToggle={() => {
//                   setDropDown(!dropDown);
//                 }}
//                 show={dropDown}
//               >
//                 <Dropdown>
//                   <DateRangeFilter
//                     setDropDown={setDropDown}
//                     setSelectedDate={setSelectedDate}
//                   />
//                 </Dropdown>
//               </DropdownButton>
//             </div>
//           </div>

//           {isLoading ? (
//             <div className="d-flex justify-content-center">
//               <Loader />
//             </div>
//           ) : (
//             <div className="overflow-x-scroll">
//               <table className="table-container">
//                 <tr>
//                   <th className="table-header ps-3">
//                     #{" "}
//                     <span className="cursor-pointer">
//                       {sortColumn === "id" && sortingId ? (
//                         <i
//                           className="bi bi-arrow-down"
//                           onClick={() => handleSort("id")}
//                         ></i>
//                       ) : (
//                         <i
//                           className="bi bi-arrow-up"
//                           onClick={() => handleSort("id")}
//                         ></i>
//                       )}
//                     </span>
//                   </th>
//                   <th
//                     className="table-header"
//                     style={{ width: "110px" }}
//                   >
//                     Display Name
//                     <span className="cursor-pointer">
//                       {sortColumn === "array_data.date_time.date_time1" &&
//                       sortingId ? (
//                         <i
//                           className="bi bi-arrow-down"
//                           onClick={() =>
//                             handleSort("array_data.date_time.date_time1")
//                           }
//                         ></i>
//                       ) : (
//                         <i
//                           className="bi bi-arrow-up"
//                           onClick={() =>
//                             handleSort("array_data.date_time.date_time1")
//                           }
//                         ></i>
//                       )}
//                     </span>
//                   </th>
//                   <th
//                     className="table-header"
//                     onClick={() => handleSort("array_data.signal.type1")}
//                     style={{ width: "100px" }}
//                   >
//                     Strategy Name
//                   </th>
//                   <th
//                     className="table-header"
//                     onClick={() => handleSort("array_data.signal.type1")}
//                   >
//                     Time Frame
//                   </th>
//                   <th
//                     className="table-header"
//                     onClick={() => handleSort("array_data.signal.type1")}
//                   >
//                     Buy/Sell
//                   </th>
//                   <th
//                     className="table-header"
//                     onClick={() => handleSort("array_data.signal.type1")}
//                     style={{ width: "100px" }}
//                   >
//                     Exit Type
//                   </th>
//                   <th
//                     className="table-header"
//                     onClick={() => handleSort("array_data.signal.type1")}
//                   >
//                     Signal <br></br> Time Entry
//                   </th>
//                   <th
//                     className="table-header"
//                     onClick={() => handleSort("array_data.signal.type1")}
//                   >
//                     Target <br></br> Stop loss
//                   </th>
//                   <th
//                     className="table-header"
//                     onClick={() => handleSort("array_data.signal.type1")}
//                   >
//                     Entry Time <br></br> Entry price
//                   </th>
//                   <th
//                     className="table-header"
//                     onClick={() => handleSort("array_data.signal.type1")}
//                   >
//                     Exit Time <br></br> Exit price
//                   </th>

//                   <th
//                     className="table-header"
//                     onClick={() => handleSort("array_data.signal.type1")}
//                   >
//                     P&L <br></br> Absolute
//                   </th>
//                   <th
//                     className="table-header"
//                     // onClick={() => handleSort("cum_profit")}
//                   >
//                     P&L %
//                     <span className="cursor-pointer">
//                       {sortColumn === "cum_profit" && sortingId ? (
//                         <i
//                           className="bi bi-arrow-down"
//                           onClick={() => handleSort("cum_profit")}
//                         ></i>
//                       ) : (
//                         <i
//                           className="bi bi-arrow-up"
//                           onClick={() => handleSort("cum_profit")}
//                         ></i>
//                       )}
//                     </span>
//                   </th>
//                 </tr>

//                 {paginatedData?.map((val, i) => (
//                   <>
//                     <tr
//                       style={{
//                         borderBottom: "1px solid #F4F5F5",
//                       }}
//                       className="table-data"
//                       key={val.id}
//                     >
//                       <td
//                         rowSpan={2}
//                         className="table-body-cell"
//                       >
//                         {val.id}
//                       </td>
//                       <td
//                         rowSpan={2}
//                         className="table-body-cell"
//                       >
//                         {val.displayname}
//                       </td>
//                       <td
//                         rowSpan={2}
//                         className="table-body-cell"
//                       >
//                         {/* {val.strategyname.replaceAll("_", " ")} */}
//                         {val.strategyname}
//                       </td>
//                       <td
//                         rowSpan={2}
//                         className="table-body-cell"
//                       >
//                         {val.timeframe}
//                       </td>
//                       <td
//                         rowSpan={2}
//                         className="table-body-cell"
//                       >
//                         {val.buysell}
//                       </td>
//                       <td
//                         rowSpan={2}
//                         className="table-body-cell"
//                       >
//                         {val.exittype}
//                       </td>
//                       <td className="double-row-body-cell">
//                         {val.type_array.EST.type2}
//                       </td>
//                       <td className="double-row-body-cell">
//                         {val.type_array.TS.type1}
//                       </td>
//                       <td className="double-row-body-cell">
//                         {val.type_array.ENTRY_TP.type1}{" "}
//                       </td>
//                       <td className="double-row-body-cell">
//                         {val.type_array.EXIT_TP.type1} {/* EXIT_TP */}
//                       </td>
//                       <td
//                         className={`${
//                           Number(val?.pl_absolute) > 0 ? "positive" : "negative"
//                         } table-body-cell ps-4`}
//                         rowSpan={2}
//                         // style={{ paddingLeft: "8px" }}
//                       >
//                         {val?.pl_absolute}
//                       </td>
//                       <td
//                         className={`${
//                           Number(
//                             val?.pl_percentage.slice(
//                               0,
//                               val?.pl_percentage.length - 1
//                             )
//                           ) > 0
//                             ? "positive"
//                             : "negative"
//                         } table-body-cell`}
//                         rowSpan={2}
//                       >
//                         {val?.pl_percentage}
//                       </td>
//                     </tr>

//                     <tr
//                       style={{
//                         borderBottom: "1px solid #F4F5F5",
//                       }}
//                       className="table-data"
//                     >
//                       <td className="double-row-body-cell">
//                         {/* EST */}
//                         {val.type_array.EST.type2}
//                       </td>
//                       <td className="double-row-body-cell">
//                         {val.type_array.TS.type2}
//                       </td>
//                       <td className="double-row-body-cell">
//                         {val.type_array.ENTRY_TP.type2}{" "}
//                       </td>
//                       <td className="double-row-body-cell">
//                         {val.type_array.EXIT_TP.type2}{" "}
//                       </td>
//                     </tr>
//                   </>
//                 ))}
//               </table>
//             </div>
//           )}
//           {isLoading === false && paginatedData.length == 0 && (
//             <div className="d-flex align-items-center justify-content-center mt-3">
//               No records found !!!
//             </div>
//           )}
//         </div>
//       </div>

//       <TableWithPagination
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         totalPages={totalPages}
//         setTotalPages={setTotalPages}
//         paginatedData={paginatedData}
//         setPaginatedData={handleSetPaginatedData}
//         data={sortedData}
//         itemsPerPage={visibleData ? visibleData : 50}
//         setVisibleData={setVisibleData}
//         visibleData={visibleData}
//         loading={isLoading}
//       />

//       <FilterModal
//         showModal={showModal}
//         setShowModal={setShowModal}
//         headerData={headerData}
//         handleStrategyChange={handleStrategyChange}
//         handleScripChange={handleScripChange}
//         handleActionChange={handleActionChange}
//         handleDayChange={handleDayChange}
//         strategy={strategy}
//         scrip={scrip}
//         action={action}
//         day={day}
//         selectedStrategy={selectedStrategy}
//         selectedScrip={selectedScrip}
//         selectedAction={selectedAction}
//         selectedDay={selectedDay}
//         handleFilterSave={handleFilterSave}
//         setFilterApply={setFilterApply}
//         handleFilterCancel={handleFilterCancel}
//       />
//     </div>
//   );
// };
// export default StrategyAnalyserTable;
