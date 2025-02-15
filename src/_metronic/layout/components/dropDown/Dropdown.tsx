import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  IStretagyHeader,
  ITabsForSecondStep,
} from "../../../../app/modules/auth";
import React from "react";

interface IDropDownProps {
  id: string;
  data: IStretagyHeader[] | null;
}

const DropDown: React.FC<IDropDownProps> = ({ id, data }) => {
  return (
    <DropdownButton
      id={id}
      title={data?.[0]?.display_name}
      className="filter-dropdown"
    >
      {data?.map((item: ITabsForSecondStep) => (
        <Dropdown.Item>{item.display_name}</Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DropDown;
