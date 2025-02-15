import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import {
  addDays,
  subDays,
  startOfMonth,
  endOfDay,
  setDate,
  getDay,
} from "date-fns";
import { Button } from "react-bootstrap";
import {
  IDateRangeFilterProps,
  ISelectedDate,
} from "../../../../app/modules/auth";

const DateRangeFilter: React.FC<IDateRangeFilterProps> = ({
  setSelectedDate = () => {},
  setDropDown = () => {},
}) => {
  const [localInfo, setLocalInfo] = useState<ISelectedDate[]>([
    {
      startDate: endOfDay(new Date()).toString(),
      endDate: endOfDay(new Date()).toString(),
      key: "selection",
    },
  ]);

  const dateConverter = (date: string) => {
    const originalDate = new Date(date);

    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(originalDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return String(formattedDate);
  };

  const handleOnChange = (ranges: any) => {
    const { selection } = ranges;
    const startDate = dateConverter(selection.startDate);
    const endDate = dateConverter(selection.endDate);
    setLocalInfo([{ ...selection, startDate, endDate }]);
  };

  const handleResetFilter = () => {
    setSelectedDate([
      {
        startDate: endOfDay(new Date()).toString(),
        endDate: endOfDay(new Date()).toString(),
        key: "selection",
      },
    ]);
    setLocalInfo([
      {
        startDate: endOfDay(new Date()).toString(),
        endDate: endOfDay(new Date()).toString(),
        key: "selection",
      },
    ]);
  };

  const handleApplyDateFilter = () => {
    setSelectedDate(localInfo);
    setDropDown(false);
  };

  return (
    <>
      <DateRangePicker
        onChange={handleOnChange}
        // showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={localInfo.map(val => ({
          startDate: new Date(val.startDate),
          endDate: new Date(val.endDate),
          key: val.key,
        }))}
        maxDate={new Date()}
        direction="horizontal"
        className="date-range-container"
      />
      <div className="bg-light p-4 d-flex justify-content-end">
        <Button
          className="btn btn-secondary"
          type="button"
          onClick={() => handleResetFilter()}
        >
          Reset
        </Button>
        <Button
          className="btn btn-primary ms-5"
          type="button"
          onClick={() => handleApplyDateFilter()}
        >
          Apply
        </Button>
      </div>
    </>
  );
};

// DateRangeFilter.propTypes = {
//   onChange: PropTypes.func,
// };

export default DateRangeFilter;
