import React from "react";
import DoughnutChart from "../../charts/DoughnutChart";
import { Row, Col } from "react-bootstrap";

const PIeChart = () => {
  const winRatio = 70; // Adjust the values based on your data
  const lossRatio = 30;
  const circumference = 180;
  const chartNumber = 18;
  const textBaseline = "top";

  return (
    <div className="new-card">
      <div
        className="card-header"
        style={{ paddingBottom: "40px" }}
      >
        <div className="card-title d-flex flex-column">
          <span className="new-pie-chart-header">Limit Utilization</span>
        </div>
      </div>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "270px", paddingBottom: "40px" }}
      >
        <DoughnutChart
          winRatio={winRatio}
          lossRatio={lossRatio}
          circumference={circumference}
          chartNumber={chartNumber}
          textBaseline={textBaseline}
        />
      </div>

      <div className="d-flex flex-column content-justify-center flex-row-fluid ">
        <div className="d-flex fw-semibold align-items-center">
          <div className=" flex-grow-1 me-4 card-sub-heading">
            Available limit
          </div>
          <div className="text-xxl-end card-sub-heading">Utilized limit</div>
        </div>

        <div className="d-flex fw-semibold align-items-center my-2">
          <div className=" flex-grow-1 me-4 card-number">198,73,980</div>
          <div className="text-xxl-end card-number">198,73,980</div>
        </div>
      </div>
    </div>
  );
};

export default PIeChart;
