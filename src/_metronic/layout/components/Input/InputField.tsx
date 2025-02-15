import React from "react";
import "../../../../styles/common.css";
import { IInputFieldProps } from "../../../../app/modules/auth";

const InputField: React.FC<IInputFieldProps> = ({
  type,
  placeholder,
  id,
  maxLength = 30,
  value,
  onChange,
  iserror,
  disabled = false,
  defaultValue = "",
  removeOpacity = false,
  min,
}) => {
  return (
    <>
      <div className="position-relative ">
        <div
          className={` ${iserror ? "form-error-input " : "form-input"}`}
          style={{ opacity: disabled && !removeOpacity ? "0.7" : "1" }}
        >
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            disabled={disabled}
            defaultValue={defaultValue}
            min={min}
            // onBlur={() => handleBlur(fieldType, fieldName, value)}
          />
          <label htmlFor={id} className="input-label">
            {placeholder}
          </label>
        </div>
      </div>
    </>
  );
};

export default InputField;
