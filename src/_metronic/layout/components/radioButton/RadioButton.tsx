import React, { useEffect, useState } from "react";
import { IRadioBtnProps } from "../../../../app/modules/auth";

const RadioButton: React.FC<IRadioBtnProps> = ({
  setContext,
  selectedTab,
  radioBtnData,
  context,
  handleSelectedRadioChange,
}) => {
  useEffect(() => {
    // Set the default value for the first radio button when the component mounts
    setContext(radioBtnData?.[0]?.value || "");
  }, []);

  return (
    <>
      <div className="gap-4 d-flex flex-wrap">
        {radioBtnData?.map((data, index) => (
          <div
            key={data.value}
            className="align-items-center d-flex"
          >
            <input
              type="radio"
              name="inlineRadioOptions"
              id={`inlineRadio${data.value}`}
              value={data.value}
              onChange={(e) => {
                handleSelectedRadioChange && handleSelectedRadioChange();
                setContext(e.target.value);
              }}
              className=" cursor-pointer"
              defaultChecked={index == 0} // Check the first radio button by default
            />
            <label
              className={
                context === data?.value
                  ? "radio-btn-label-checked ms-2"
                  : "ms-2 radio-btn-label"
              }
              htmlFor={`inlineRadio${data.value}`}
            >
              {data.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default RadioButton;
