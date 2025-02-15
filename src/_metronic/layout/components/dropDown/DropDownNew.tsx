// import Dropdown, { Option } from "react-dropdown";
// import "react-dropdown/style.css";
// import React, { useState } from "react";
// import { IStretagyHeader } from "../../../../app/modules/auth";

// interface IData {
//   value: string;
//   label: string;
// }

// interface IDropDownNewProps {
//   id: string;
//   data: IData[];
//   value: string;
//   onChange: (value: Option) => void;
// }

// const DropDownNew: React.FC<IDropDownNewProps> = ({
//   id,
//   data,
//   value,
//   onChange,
// }) => {
//   return (
//     <Dropdown
//       options={data}
//       onChange={onChange}
//       value={value}
//       placeholder={data[0].label}
//       className="dropdown-container"
//       //   menuClassName="dropdown-menu"
//     />
//   );
// };

// export default DropDownNew;

import React, { FunctionComponent, useState } from "react";
import Select, {
  GroupBase,
  OptionProps,
  Options,
  SingleValue,
  components,
} from "react-select";
import { TSelectedDataKey } from "../../../../app/modules/auth";

const InputOption: FunctionComponent<
  OptionProps<TSelectedDataKey, false, GroupBase<TSelectedDataKey>>
> = ({
  getStyles,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
    justifyContent: "space-between",
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      {children}
      <input
        type="checkbox"
        checked={isSelected}
      />
    </components.Option>
  );
};

//TODO: Fix name

const normalInputStyle = {
  container: (provided: any) => ({
    ...provided,
    backgroundColor: "transparent",
    width: "100%",
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    // overflow: "visible",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    fontFamily: "Inter",
    fontSize: 14,
    // fontWeight:300,
    color: "#41414e",
    marginLeft: "10px",
    padding: "0px",
    paddingTop: "2px",
  }),

  dropdownIndicator: (base: any, state: any) => ({
    ...base,
    // color: "#f4f",
    transition: "all .2s ease",
    transform: state.isFocused ? "rotate(180deg)" : null,
    padding: "10px 16px",
  }),

  placeholder: (base: any) => ({
    ...base,
    position: "absolute",
    fontWeight: "300",
    background: "rgb(255,255,255)",
    borderRadius: 2,
    margin: "0px",
    // marginLeft: "10px",
    // transition: "top 0.2s, font-size 0.2s",
  }),

  control: (baseStyles: any) => ({
    ...baseStyles,
    // paddingTop: "4px",
    fontSize: 14,
    fontWeight: 300,
    borderRadius: "8px",
    // backgroundColor: "red !important",
  }),

  option: (base: any) => {
    return {
      ...base,
      backgroundColor: "#fff",
      fontSize: 14,
      fontFamily: "Inter",
      zIndex: 1,
      paddingLeft: "15px",
      cursor: "pointer",
    };
  },

  singleValue: (provided: any) => ({
    ...provided,
    marginLeft: "4px",

    // specify a fallback color here for those values not accounted for in the styleMap
  }),

  menu: (base: any) => ({
    ...base,
    zIndex: 3,
    fontSize: 14,
    fontWeight: 300,
    width: "max-content",
    minWidth: "100%",
    boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.25)",
    borderRadius: "12px",
    // overflowX: "scroll",
  }),

  menuPortal: (base: any) => ({ ...base, zIndex: 10000 }),
};

export type OptionType = {
  value: string;
  label: string;
};

// const options: OptionType[] = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

interface IDropDownNewProps {
  option: OptionType[];
  onChange: (value: TSelectedDataKey) => void;
  // value: OptionType | null | { value: null; label: null };
  value: TSelectedDataKey;
  flag: string;
}

const DropDownNew = ({ option, onChange, value, flag }: IDropDownNewProps) => {
  const [selectedOptions, setSelectedOptions] = useState(option[0]);

  const handleOnChange = (val: SingleValue<TSelectedDataKey>) => {
    if (!val) return;
    const temp: TSelectedDataKey = {
      label: val?.label,
      value: val?.value,
    };
    onChange(temp);
  };

  return (
    <Select
      // defaultValue={option[0]}
      isMulti={false}
      closeMenuOnSelect={true}
      hideSelectedOptions={false}
      onChange={handleOnChange}
      value={value}
      options={option}
      components={{
        Option: InputOption,
      }}
      styles={normalInputStyle}
      // flag={flag}
    />
  );
};

export default DropDownNew;
